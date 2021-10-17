<template>
  <div>
    <slot name="button">
      <slot name="type">
        <template>
          <!-- Here is the content button for the slot -->
        </template>
      </slot>
    </slot>

    <slot name="content">
      <template>
        <!-- Here is the content of the cart -->
      </template>
    </slot>
  </div>
</template>

<script>
//
export default {};
</script>

<style scoped></style>
