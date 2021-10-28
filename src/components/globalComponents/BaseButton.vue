<template>
  <div>
    <button v-on="$listeners" :class="buttonClass" v-bind="$attrs">
      <slot>
        <template> </template>
      </slot>
    </button>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    buttonClass: {
      type: String,
    },
  },
};
</script>

<style scoped>
button {
  background-color: var(--orange);
  font-size: 1.25rem;
  padding: 7px 10px;
  border-radius: 7px;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: rgba(255, 193, 7, 0.8);
}

button:disabled {
  color: var(--black);
  background-color: var(--gray);
}

.make-a-review {
  width: 100%;
}

.btn-details {
  background-color: rgba(0, 0, 0, 0.2);
}

.btn-details:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.btn-cart {
  padding: 13px;
  background-color: var(--green);
  border: none;
  border-radius: 50%;
  cursor: pointer;
}

.btn-cart:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.btn-cart .number-products {
  width: 18px;
  height: 18px;

  position: absolute;
  top: 1px;
  left: 0;
  font-size: 1rem;

  border-radius: 50%;
  background-color: var(--orange);
}

.control-buttons {
  width: 24px;
  height: 24px;
  color: var(--white);
  font-weight: 500;
  font-size: 1.1rem;
  background-color: var(--gray);
  border: none;
  border-radius: 50%;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
}

.control-buttons:hover {
  background-color: var(--black);
}
</style>
