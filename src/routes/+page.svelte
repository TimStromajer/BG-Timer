<script>
    import { onMount } from "svelte";
    import {startTimerValue} from "../stores/timerSettings"

    let timerStatus = "stopped"
    let timerText = $startTimerValue;
    let intervalID;

    onMount(() => {
		$startTimerValue = 5
	})

    function changeTimer(seconds) {
        timerText += seconds;
        if (timerText <= 0) {
            stopTimer()
            timerStatus = "over"
        }
    }

    function startTimer() {
        intervalID = setInterval(changeTimer, 1000, -1)
    }

    function resetTimer() {
        timerStatus = "running"
        timerText = $startTimerValue;
        stopTimer()
        startTimer()
    }

    function stopTimer() {
        if (intervalID) clearInterval(intervalID)
    }
</script>

<button class="timer-btn" on:click={() => resetTimer()}>
    <div class="timer-text">
        {#if timerStatus == "over"}
            WASTED
        {:else if timerStatus == "running"}
            {timerText}
        {:else if timerStatus == "stopped"}
            {timerText} (stopped)
        {/if}
    </div>
</button>

<style>
    .timer-btn {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }
    .timer-text {
        font-size: 7em;
    }
</style>