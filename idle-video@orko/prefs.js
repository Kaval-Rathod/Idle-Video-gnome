/* prefs.js
 *
 * Idle Video - GNOME Shell Extension
 * Preferences window with video validation and preview
 * 
 * Copyright (C) 2025 Kaval Rathod
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import Adw from 'gi://Adw';
import Gio from 'gi://Gio';
import Gtk from 'gi://Gtk';
import GLib from 'gi://GLib';

import {ExtensionPreferences} from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

const SCHEMA = 'org.gnome.shell.extensions.idlevideo';

export default class IdleVideoPreferences extends ExtensionPreferences {
    _validateVideoFile(path) {
        if (!path || path === '') {
            return { valid: false, message: '⚠ No video file selected' };
        }
        
        const file = Gio.File.new_for_path(path);
        if (!file.query_exists(null)) {
            return { valid: false, message: '❌ File does not exist' };
        }
        
        try {
            const fileInfo = file.query_info('standard::content-type,standard::size', 
                Gio.FileQueryInfoFlags.NONE, null);
            const contentType = fileInfo.get_content_type();
            const size = fileInfo.get_size();
            
            if (!contentType || !contentType.startsWith('video/')) {
                return { valid: false, message: '❌ Not a video file' };
            }
            
            if (size === 0) {
                return { valid: false, message: '❌ Video file is empty' };
            }
            
            const sizeMB = (size / 1024 / 1024).toFixed(1);
            return { valid: true, message: `✓ Valid video (${sizeMB} MB, ${contentType})` };
        } catch (e) {
            return { valid: false, message: `❌ Error: ${e.message}` };
        }
    }

    fillPreferencesWindow(window) {
        // Load settings from extension's local schema directory
        const schemaDir = this.path + '/schemas';
        const schemaSource = Gio.SettingsSchemaSource.new_from_directory(
            schemaDir,
            Gio.SettingsSchemaSource.get_default(),
            false
        );
        const schemaObj = schemaSource.lookup(SCHEMA, true);
        if (!schemaObj) {
            throw new Error(`Schema ${SCHEMA} not found in ${schemaDir}`);
        }
        const settings = new Gio.Settings({ settings_schema: schemaObj });

        // Create preferences page
        const page = new Adw.PreferencesPage();
        window.add(page);

        // Create group for video settings
        const group = new Adw.PreferencesGroup({
            title: 'Idle Video Settings',
            description: 'Configure when and how the idle video plays'
        });
        page.add(group);

        // Video path row
        const videoRow = new Adw.ActionRow({
            title: 'Video File Path',
            subtitle: 'Select the video to play when idle'
        });

        // Container for entry + buttons + status
        const videoMainBox = new Gtk.Box({
            orientation: Gtk.Orientation.VERTICAL,
            spacing: 6,
            hexpand: true
        });

        const videoControlBox = new Gtk.Box({
            orientation: Gtk.Orientation.HORIZONTAL,
            spacing: 6
        });

        const videoEntry = new Gtk.Entry({
            placeholder_text: 'No video selected',
            text: settings.get_string('video-path'),
            hexpand: true,
            valign: Gtk.Align.CENTER
        });

        // Status label
        const statusLabel = new Gtk.Label({
            halign: Gtk.Align.START,
            use_markup: true,
            wrap: true,
            xalign: 0
        });

        const updateStatus = () => {
            const path = videoEntry.get_text();
            const result = this._validateVideoFile(path);
            statusLabel.set_markup(`<small>${GLib.markup_escape_text(result.message, -1)}</small>`);
            previewButton.set_sensitive(result.valid);
        };

        videoEntry.connect('changed', () => {
            updateStatus();
        });

        const browseButton = new Gtk.Button({
            label: 'Browse',
            valign: Gtk.Align.CENTER
        });

        const previewButton = new Gtk.Button({
            icon_name: 'media-playback-start-symbolic',
            valign: Gtk.Align.CENTER,
            tooltip_text: 'Preview video'
        });

        const applyButton = new Gtk.Button({
            label: 'Apply',
            valign: Gtk.Align.CENTER,
            css_classes: ['suggested-action']
        });

        browseButton.connect('clicked', () => {
            const dialog = new Gtk.FileChooserDialog({
                title: 'Select Video File',
                action: Gtk.FileChooserAction.OPEN,
                transient_for: window,
                modal: true
            });

            dialog.add_button('Cancel', Gtk.ResponseType.CANCEL);
            dialog.add_button('Open', Gtk.ResponseType.OK);

            const filter = new Gtk.FileFilter();
            filter.set_name('Video files');
            filter.add_mime_type('video/*');
            filter.add_pattern('*.mp4');
            filter.add_pattern('*.mkv');
            filter.add_pattern('*.webm');
            filter.add_pattern('*.avi');
            filter.add_pattern('*.mov');
            dialog.add_filter(filter);

            const allFilter = new Gtk.FileFilter();
            allFilter.set_name('All files');
            allFilter.add_pattern('*');
            dialog.add_filter(allFilter);

            dialog.connect('response', (_dialog, response) => {
                if (response === Gtk.ResponseType.OK) {
                    const file = dialog.get_file();
                    if (file) {
                        const path = file.get_path();
                        videoEntry.set_text(path);
                        updateStatus();
                    }
                }
                dialog.destroy();
            });

            dialog.show();
        });

        previewButton.connect('clicked', () => {
            const path = videoEntry.get_text();
            const result = this._validateVideoFile(path);
            
            if (result.valid) {
                try {
                    GLib.spawn_command_line_async(`mpv --geometry=800x600 --no-osc "${path}"`);
                } catch (e) {
                    const errorDialog = new Adw.MessageDialog({
                        transient_for: window,
                        heading: 'Preview Failed',
                        body: `Could not launch mpv: ${e.message}\n\nInstall mpv: sudo apt install mpv`,
                        modal: true
                    });
                    errorDialog.add_response('ok', 'OK');
                    errorDialog.present();
                }
            }
        });

        applyButton.connect('clicked', () => {
            const path = videoEntry.get_text();
            const result = this._validateVideoFile(path);
            
            if (result.valid || path === '') {
                settings.set_string('video-path', path);
                const confirmDialog = new Adw.MessageDialog({
                    transient_for: window,
                    heading: 'Video Path Updated',
                    body: path === '' ? 
                        'Video path cleared. Extension will not play anything.' :
                        `Extension will restart with new video:\n\n${result.message}`,
                    modal: true
                });
                confirmDialog.add_response('ok', 'OK');
                confirmDialog.present();
            } else {
                const errorDialog = new Adw.MessageDialog({
                    transient_for: window,
                    heading: 'Invalid Video File',
                    body: result.message + '\n\nPlease select a valid video file.',
                    modal: true
                });
                errorDialog.add_response('ok', 'OK');
                errorDialog.present();
            }
        });

        videoControlBox.append(videoEntry);
        videoControlBox.append(browseButton);
        videoControlBox.append(previewButton);
        videoControlBox.append(applyButton);

        videoMainBox.append(videoControlBox);
        videoMainBox.append(statusLabel);

        videoRow.add_suffix(videoMainBox);
        videoRow.activatable_widget = browseButton;
        group.add(videoRow);

        // Initial status update
        updateStatus();

        // Idle seconds row
        const idleRow = new Adw.ActionRow({
            title: 'Idle Time (seconds)',
            subtitle: 'Time of inactivity before video plays'
        });

        const idleSpin = new Gtk.SpinButton({
            adjustment: new Gtk.Adjustment({
                lower: 5,
                upper: 3600,
                step_increment: 1,
                page_increment: 10,
                value: settings.get_int('idle-seconds')
            }),
            valign: Gtk.Align.CENTER
        });

        idleSpin.connect('value-changed', () => {
            settings.set_int('idle-seconds', idleSpin.get_value_as_int());
        });

        idleRow.add_suffix(idleSpin);
        idleRow.activatable_widget = idleSpin;
        group.add(idleRow);

        // Mute row
        const muteRow = new Adw.ActionRow({
            title: 'Mute Video',
            subtitle: 'Play video without sound'
        });

        const muteSwitch = new Gtk.Switch({
            active: settings.get_boolean('mute'),
            valign: Gtk.Align.CENTER
        });

        muteSwitch.connect('notify::active', () => {
            settings.set_boolean('mute', muteSwitch.active);
        });

        muteRow.add_suffix(muteSwitch);
        muteRow.activatable_widget = muteSwitch;
        group.add(muteRow);
    }
}
