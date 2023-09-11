<script>
    import { onMount } from "svelte";
    import { startTimerValue } from "../stores/timerSettings";

    let settingDialog;

    onMount(() => {
		settingDialog = document.getElementById('setting-dialog');
	})

    async function openSettingsDialog() {
        settingDialog.showModal()
    }
</script>

<div class="fixed-menu">
    <button class="settings-btn" on:click={() => openSettingsDialog()}>Settings</button>
</div>

<dialog class="settings-dialog" id="setting-dialog">
    <h4>Settings</h4>
    <input type="number" bind:value={$startTimerValue}>
    <button class="dialog-cancel-btn" on:click={() => settingDialog.close()}>Confirm</button>
</dialog>

<style>
    .fixed-menu {
        position: fixed;
        margin: 0.1em;
        z-index: 111;
    }
    .settings-btn {
        font-size: 1.5em;
    }
</style>