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
          audio.currentTime = 0.4
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

  function formatTimer(seconds_) {
    let minutes = 0
    if (seconds_ >= 60) {
      minutes = Math.floor(seconds_ / 60)
    }
    let seconds = (seconds_%60).toFixed(2)

    if (minutes == 0) {
      return seconds
    }
    else if (seconds < 10 ) {
      seconds = "0" + seconds
    }

    return minutes + ":" + seconds
  }
</script>

{#if timer}
<button class="timer-btn" class:wasted={timer["timerStatus"] == "over"} on:click={() => timerClick()}>
  
  {#if timer["timerStatus"] == "over"}
      <div class="timer-text-over">
          wasted
      </div>
  {:else if timer["timerStatus"] == "running"}
      <div class="timer-text-running">
          {timerText != null ? formatTimer(timerText) : ""}
      </div>
  {:else if timer["timerStatus"] == "stopped"}
      <div class="timer-text-stopped">
          {timerText != null ? formatTimer(timerText) : ""}
      </div>
  {/if}
</button>
{/if}

<audio src={src} bind:this={audio}></audio>

<style>
  .timer-btn {
      background-color: rgb(168, 209, 247);
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
      font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      font-weight: 800;

      text-shadow: 0 0 8px #000000, 0 0 10px #000000;

      animation-name: showText;
      animation-duration: 4s;
      animation-fill-mode: forwards;
  }
  .wasted {
      animation-name: fade;
      animation-duration: 3s;
      animation-fill-mode: forwards;
  }

  @keyframes fade {
    100% {background-color: rgb(68, 68, 68);}
  }
  @keyframes showText {
    0% {
      visibility: hidden;
    }
    50% {
      visibility: hidden;
    }
    60% {
      visibility: visible;
    }
  }
</style>