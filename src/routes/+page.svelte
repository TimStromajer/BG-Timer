<script>
    import { onMount } from "svelte";

	import Timer from "./timer.svelte";
    import { timers, startTimerValue, timerNumber, resetTimers, stopTimers } from "../stores/timerSettings";

    let innerWidth = 0
    let innerHeight = 0

    onMount(() => {
        $startTimerValue = 111
        $timerNumber = 2
        $timers = []

        for (let i = 0; i<$timerNumber; i++) {
            $timers.push({i: {"message": null}})
        }
    })

    $: $timerNumber, timerNumberChange()
    $: $resetTimers, resetTimersFunc()
    $: $stopTimers, stopAllTimers()

    function timerNumberChange() {
        $timers = []
        for (let i = 0; i<$timerNumber; i++) {
            $timers.push({i: {"message": null}})
        }
    }
    async function resetTimersFunc() {
        if ($resetTimers) {
            await stopAllTimers()
            await resetAllTimers()
        }
        $resetTimers = null 
    }
    function stopAllTimers() {
        for (let i = 0; i < $timerNumber; i++) {
            $timers[i]["message"] = "stop"
        }
        $stopTimers = null
    }
    function resetAllTimers() {
        for (let i = 0; i < $timerNumber; i++) {
            $timers[i]["message"] = "reset"
        }
    }
</script>

<svelte:window bind:innerWidth bind:innerHeight />

{#if $timers}
    {#each $timers as timer, i}
        <div class="timer-div" style="--screenHeight:{innerHeight}px; --timerNumber:{$timers.length}">
            <Timer timerId={i}></Timer>
        </div>
    {/each}
{/if}

<style>
    .timer-div {
        position: relative;
        height: calc(var(--screenHeight) / var(--timerNumber));
    }
</style>