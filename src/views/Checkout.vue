<template>
  <div class="checkout-container">
    <div v-show="errors.length" class="errors">
      <ul>
        <li v-for="(error, ind) in errors" :key="ind">{{ error }}</li>
      </ul>
    </div>
    <form @submit.prevent="onSubmit">
      <div>
        <label for="name">Name</label>
        <input type="text" name="name" id="name" v-model="name" required />
      </div>
      <div>
        <label for="email">E-mail</label>
        <input type="text" name="email" id="email" v-model="email" />
      </div>
      <div>
        <select name="payment" id="payment" v-model="payment">
          <option value="null" selected hidden>Payment Method</option>
          <option>Cash at delivery</option>
          <option>Credit/Debit Card</option>
          <option>Google Pay</option>
        </select>
      </div>
      <div class="btn-container">
        <button>Validate</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: null,
      email: null,
      payment: null,
      orders: [],
      errors: [],
    };
  },
  methods: {
    onSubmit() {
      if (this.errors.length === 3) {
        this.errors = [];
      }
      if (this.name && this.email && this.payment) {
        let order = {
          name: this.name,
          email: this.email,
          payment: this.payment,
        };
        this.orders.push(order);
        this.name = null;
        this.email = null;
        this.payment = null;
      } else {
        if (!this.name) this.errors.push("Name Required!");
        if (!this.email) this.errors.push("E-mail Required!");
        if (!this.payment) this.errors.push("Payment method Required!");
      }
    },
  },
};
</script>

<style scoped>
.checkout-container {
  width: 100%;
  height: 40vh;
  margin-top: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.checkout-container form {
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;

  justify-content: space-around;
  align-items: flex-start;
}

.checkout-container form div {
  width: 100%;
  height: 15%;
  display: flex;
  flex-direction: column;
}

.checkout-container form div label,
.checkout-container form div input,
.checkout-container form div select option {
  font-size: 1.25rem;
  color: var(--gray);
}

.checkout-container form div input,
.checkout-container form div select {
  border: none;
  border-bottom: 1.5px solid black;
  outline: none;
}

.checkout-container form div input:focus,
.checkout-container form div select:focus {
  border-color: var(--gray);
}

.checkout-container form div select {
  border: none;
  border-bottom: 1.5px solid black;
  outline: none;
  font-size: 1.25rem;
  color: var(--gray);
}

.checkout-container .btn-container button {
  width: 12%;
  font-size: 1.25rem;
  padding: 7px 10px;
  border: none;
  border-radius: 7px;
  cursor: pointer;
  background-color: var(--orange);
}

.checkout-container .btn-container button:hover {
  background-color: rgba(255, 193, 7, 0.8);
}

.checkout-container .btn-container button:disabled {
  color: var(--black);
  background-color: var(--gray);
}
</style>
