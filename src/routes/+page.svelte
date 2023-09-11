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
    
    {#if timerStatus == "over"}
        <div class="timer-text-over">
            WASTED
        </div>
    {:else if timerStatus == "running"}
        <div class="timer-text-running">
            {timerText}
        </div>
    {:else if timerStatus == "stopped"}
        <div class="timer-text-stopped">
            {timerText}
        </div>
    {/if}
</button>

<style>
    .timer-btn {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }
    .timer-text-running {
        font-size: 7em;
    }
    .timer-text-stopped {
        font-size: 7em;
        color: rgb(184, 184, 184);
    }
    .timer-text-over {
        font-size: 5em;
        color: red;
    }
</style>