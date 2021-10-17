<template>
  <div>
    <button>
      <span>
        <slot><i class="fab fa-facebook-f"></i></slot>
      </span>
    </button>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
button {
  width: 36px;
  height: 36px;
  font-size: 1.25rem;
  color: var(--white);
  text-align: center;
  border-radius: 50%;
  background-color: var(--green);
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: rgba(1, 1, 1, 0.5);
}
</style>
