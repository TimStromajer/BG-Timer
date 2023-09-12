<script>
    import { onMount } from "svelte";
    import { startTimerValue, timerNumber, resetTimers, stopTimers } from "../stores/timerSettings";

    let settingDialog;

    onMount(() => {
		settingDialog = document.getElementById('setting-dialog');
	})

    async function openSettingsDialog() {
        settingDialog.showModal()
    }

    function resetTimersClick() {
        $resetTimers = true;
    }
    function stopTimersClick() {
        $stopTimers = true
    }
</script>

<div class="fixed-menu">
    <button class="settings-btn" on:click={() => openSettingsDialog()}>Settings</button>
</div>

<dialog class="settings-dialog" id="setting-dialog">
    <div class="dialog-title">Settings</div>
    <div class="dialog-row">
        <div class="dialog-label">Timers: </div>
        <input class="dialog-timer-number" type="number" bind:value={$timerNumber}>
    </div>
    <div class="dialog-row">
        <div class="dialog-label">Seconds: </div>
        <input class="dialog-timer-input" type="number" bind:value={$startTimerValue}>
    </div>
    <button class="dialog-confirm-btn" on:click={() => settingDialog.close()}>Confirm</button>
    <button class="dialog-confirm-btn" on:click={() => {settingDialog.close(); resetTimersClick()}}>Reset</button>
    <button class="dialog-confirm-btn" on:click={() => {settingDialog.close(); stopTimersClick()}}>Stop all</button>
</dialog>

<style>
    .fixed-menu {
        top: 0.5em;
        left: 0.5em;
        position: fixed;
        z-index: 111;
    }
    .settings-btn {
        font-size: 1.5em;
    }
    .settings-dialog {
        padding: 2em;
    }
    .dialog-title {
        font-size: 3em;
        padding-bottom: 0.5em;
    }
    .dialog-timer-input, .dialog-timer-number {
        font-size: 2em;
        width: 5em;
        margin-right: 0.3em;
    }
    .dialog-label {
        font-size: 2em;
        padding-right: 0.5em;
    }
    .dialog-confirm-btn {
        font-size: 1.5em;
    }
    .dialog-row {
        display: flex;
        padding-bottom: 0.5em;
    }
</style>