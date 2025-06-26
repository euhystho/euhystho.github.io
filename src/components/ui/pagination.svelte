<script lang="ts">
  import * as Pagination from "$lib/components/ui/pagination/index.js";
  interface Props {
    page: {
    currentPage: number;
    lastPage: number;
    total: number;
    size: number;
    url: {
      prev?: string;
      next?: string;
      current: string;
    };
  };
  }

  let { page }: Props = $props();

  let currentPage = $derived(page.currentPage);
  let totalItems = $derived(page.total);
  let itemsPerPage = $derived(page.size);

  // Handle page changes by navigating to the new URL
  function handlePageChange(newPage: number) {
    try {
      const isPreviousPage = newPage === currentPage - 1 && page.url.prev;
      const isNextPage = newPage === currentPage + 1 && page.url.next;

      if (isPreviousPage) {
        window.location.href = page.url.prev!;
      } else if (isNextPage) {
        window.location.href = page.url.next!;
      } else {
        // For non-adjacent pages, construct the URL more reliably
        const url = new URL(page.url.current, window.location.origin);
        const pathSegments = url.pathname.split("/").filter(Boolean);

        // Remove last segment if it's a number (current page)
        if (
          pathSegments.length > 0 &&
          /^\d+$/.test(pathSegments[pathSegments.length - 1])
        ) {
          pathSegments.pop();
        }

        const basePath = "/" + pathSegments.join("/");
        const newUrl = newPage === 1 ? basePath : `${basePath}/${newPage}`;
        window.location.href = newUrl;
      }
    } catch (error) {
      console.error("Navigation failed:", error);
      window.location.href =
        currentPage === 1 ? "/projects" : `/projects/${currentPage}`;
    }
  }
</script>

<Pagination.Root
  count={totalItems}
  perPage={itemsPerPage}
  page={currentPage}
  onPageChange={handlePageChange}
>
  {#snippet children({
    pages,
    currentPage: current,
  }: {
    pages: Array<any>;
    currentPage: number;
  })}
    <Pagination.Content>
      <Pagination.Item>
        <Pagination.PrevButton />
      </Pagination.Item>

      {#each pages as pageItem (pageItem.key)}
        <Pagination.Item>
          {#if pageItem.type === "ellipsis"}
            <Pagination.Ellipsis />
          {:else}
            <Pagination.Link
              page={pageItem}
              isActive={current === pageItem.value}
            >
              {pageItem.value}
            </Pagination.Link>
          {/if}
        </Pagination.Item>
      {/each}

      <Pagination.Item>
        <Pagination.NextButton />
      </Pagination.Item>
    </Pagination.Content>
  {/snippet}
</Pagination.Root>
