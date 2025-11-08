import Gio from 'gi://Gio';
import GLib from 'gi://GLib';
import St from 'gi://St';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';
import * as PopupMenu from 'resource:///org/gnome/shell/ui/popupMenu.js';

const SCHEMA = 'org.gnome.shell.extensions.idlevideo';

let _button = null;
let _settings = null;
let _idleMonitorId = null;
let _mpvPid = null;
let _checkIdleTimeout = null;

function _getSettings() {
    if (!_settings) {
        const schemaDir = GLib.build_filenamev([GLib.get_home_dir(), '.local', 'share', 'gnome-shell', 'extensions', 'idle-video@orko', 'schemas']);
        const schemaSource = Gio.SettingsSchemaSource.new_from_directory(
            schemaDir,
            Gio.SettingsSchemaSource.get_default(),
            false
        );
        const schemaObj = schemaSource.lookup(SCHEMA, true);
        if (!schemaObj) {
            console.error('idle-video@orko: schema not found:' + SCHEMA);
            throw new Error('settings schema not found');
        }
        _settings = new Gio.Settings({ settings_schema: schemaObj });
    }
    return _settings;
}

function _getIdleTime() {
    try {
        const [success, stdout] = GLib.spawn_command_line_sync('xprintidle');
        if (success) {
            return parseInt(new TextDecoder().decode(stdout).trim());
        }
    } catch (e) {
        console.error('idle-video@orko: failed to get idle time: ' + e);
    }
    return 0;
}

function _startMpv() {
    if (_mpvPid !== null) {
        return; // Already playing
    }

    const settings = _getSettings();
    const video = settings.get_string('video-path');
    const mute = settings.get_boolean('mute');

    if (!video || video === '') {
        console.log('idle-video@orko: no video configured');
        return;
    }

    // Check if video file exists
    const file = Gio.File.new_for_path(video);
    if (!file.query_exists(null)) {
        console.error('idle-video@orko: video file not found: ' + video);
        return;
    }

    const mpvArgs = [
        'mpv',
        '--fs',
        '--loop=no',
        '--no-osc',
        '--really-quiet',
        '--no-input-terminal'
    ];

    if (mute) {
        mpvArgs.push('--mute=yes');
    }

    mpvArgs.push(video);

    try {
        const [success, pid] = GLib.spawn_async(
            null,
            mpvArgs,
            null,
            GLib.SpawnFlags.SEARCH_PATH | GLib.SpawnFlags.DO_NOT_REAP_CHILD,
            null
        );

        if (success) {
            _mpvPid = pid;
            console.log('idle-video@orko: started mpv with video=' + video + ' mute=' + mute + ' pid=' + pid);
            
            // Watch for mpv exit
            GLib.child_watch_add(GLib.PRIORITY_DEFAULT, pid, () => {
                _mpvPid = null;
                console.log('idle-video@orko: mpv exited');
            });
        }
    } catch (e) {
        console.error('idle-video@orko: failed to start mpv: ' + e);
    }
}

function _stopMpv() {
    if (_mpvPid !== null) {
        try {
            GLib.spawn_command_line_sync(`kill ${_mpvPid}`);
            console.log('idle-video@orko: stopped mpv');
            _mpvPid = null;
        } catch (e) {
            console.error('idle-video@orko: failed to stop mpv: ' + e);
        }
    }
}

function _checkIdle() {
    const settings = _getSettings();
    const video = settings.get_string('video-path');
    
    if (!video || video === '') {
        return GLib.SOURCE_CONTINUE;
    }

    const idleSeconds = settings.get_int('idle-seconds');
    const idleMs = _getIdleTime();
    const idleThresholdMs = idleSeconds * 1000;

    if (idleMs >= idleThresholdMs) {
        _startMpv();
    } else {
        _stopMpv();
    }

    return GLib.SOURCE_CONTINUE;
}

function _startMonitoring() {
    if (_checkIdleTimeout !== null) {
        return; // Already monitoring
    }

    const settings = _getSettings();
    const video = settings.get_string('video-path');

    if (!video || video === '') {
        console.log('idle-video@orko: no video configured, skipping monitoring');
        return;
    }

    console.log('idle-video@orko: started idle monitoring');
    
    // Check idle time every 2 seconds
    _checkIdleTimeout = GLib.timeout_add(GLib.PRIORITY_DEFAULT, 2000, _checkIdle);
}

function _stopMonitoring() {
    if (_checkIdleTimeout !== null) {
        GLib.Source.remove(_checkIdleTimeout);
        _checkIdleTimeout = null;
        console.log('idle-video@orko: stopped idle monitoring');
    }
    _stopMpv();
}

export default class IdleVideoExtension {
    enable() {
        // Panel icon + menu
        _button = new PanelMenu.Button(0.0, 'idle-video-button', false);
        const icon = new St.Icon({ icon_name: 'media-playback-start-symbolic', style_class: 'system-status-icon' });
        _button.add_child(icon);

        // Add a simple menu item to open prefs
        const menuItem = new PopupMenu.PopupMenuItem('Preferences...');
        menuItem.connect('activate', () => {
            try {
                GLib.spawn_command_line_async('gnome-extensions prefs idle-video@orko');
            } catch (e) {
                console.error('idle-video@orko: failed to open prefs: ' + e);
            }
        });
        _button.menu.addMenuItem(menuItem);

        Main.panel.addToStatusArea('idle-video-button', _button, 1, 'right');

        // Start monitoring
        try {
            _startMonitoring();
        } catch (e) {
            console.error('idle-video@orko: error starting monitoring: ' + e);
        }

        // Watch for setting changes
        try {
            _getSettings().connect('changed', (settings, key) => {
                console.log(`idle-video@orko: setting changed: ${key}`);
                _stopMonitoring();
                GLib.timeout_add(GLib.PRIORITY_DEFAULT, 500, () => {
                    _startMonitoring();
                    return GLib.SOURCE_REMOVE;
                });
            });
        } catch (e) {
            console.error(e);
        }
    }

    disable() {
        if (_button !== null) {
            _button.destroy();
            _button = null;
        }
        _stopMonitoring();
        _settings = null;
    }
}
