<script lang="ts">
  let { link, iconLeft, iconRight, name } = $props();
</script>

<a
  href={link}
  class=" text-shadow-lg/5 bg-primary dark:hover:bg-accent hover:bg-secondary rounded-full px-8 py-3 font-semibold text-white transition-colors flex items-center justify-center gap-2"
>
  {#if iconLeft}
    <span class={iconLeft} aria-hidden="true"></span>
  {/if}
  {name}
  {#if iconRight}
    <span class={iconRight} aria-hidden="true"></span>
  {/if}
</a>
