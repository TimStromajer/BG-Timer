<script>
  import { onMount } from "svelte";
  import { timers, startTimerValue} from "../stores/timerSettings"

  export let timerId;
  let timer = {};

  let timerText = $startTimerValue;
  let intervalID;

  $: $startTimerValue, timerText = $startTimerValue;

  let audio
  let src = "./gta-v-death-sound-effect.mp3"

  onMount(() => {
    timer = $timers[timerId]
    timer["startTimerValue"] = $startTimerValue
    timer["timerStatus"] = "stopped"
    timer["message"] = null
  })

  $: $timers[timerId]["message"], messageReceived()

  function messageReceived() {
    if ($timers[timerId]["message"]) {
      if ($timers[timerId]["message"] == "start" && timer["timerStatus"] != "running") {
        startTimer()
      }
      if ($timers[timerId]["message"] == "stop" && timer["timerStatus"] == "running") {
        stopTimer()
      }
      if ($timers[timerId]["message"] == "reset") {
        resetTimer()
      }
      $timers[timerId]["message"] = null
    }
  }

  function changeTimer(seconds) {
      timerText += seconds;
      if (timerText <= 0) {
          stopTimer()
          audio.play()
          timer["timerStatus"] = "over"
      }
  }

  function startTimer() {
      intervalID = setInterval(changeTimer, 100, -0.1)
      timer["intervalID"] = intervalID
      timer["timerStatus"] = "running"
  }

  function resetTimer() {
    stopTimer()
    timerText = $startTimerValue;
  }

  function timerClick() {
      stopTimer()
      if ($timers.length == 1) {
        timerText = $startTimerValue;
        startTimer()
      } else {
        startNextTimer()
      }
  }

  function stopTimer() {
      if (intervalID) clearInterval(intervalID)
      timer["timerStatus"] = "stopped"
  }

  function startNextTimer() {
    let nextId;
    if (timerId == $timers.length - 1) {
      nextId = 0;
    } else {
      nextId = timerId + 1
    }
    $timers[nextId]["message"] = "start"
  }
</script>

{#if timer}
<button class="timer-btn" on:click={() => timerClick()}>
  
  {#if timer["timerStatus"] == "over"}
      <div class="timer-text-over">
          WASTED
      </div>
  {:else if timer["timerStatus"] == "running"}
      <div class="timer-text-running">
          {timerText != null ? timerText.toFixed(2) : ""}
      </div>
  {:else if timer["timerStatus"] == "stopped"}
      <div class="timer-text-stopped">
          {timerText != null ? timerText.toFixed(2) : ""}
      </div>
  {/if}
</button>
{/if}

<audio src={src} bind:this={audio}></audio>



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