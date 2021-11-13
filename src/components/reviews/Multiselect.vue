<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <multiselect
      v-bind="$attrs"
      track-by="id"
      label="title"
      :options="options"
      :option-height="80"
      :show-labels="false"
      :allow-empty="false"
      v-model="currentProduct"
      :maxHeight="168"
      @select="sendValue"
      v-on="$listeners"
    >
      <div
        slot="singleLabel"
        slot-scope="props"
        class="container-opt"
        v-if="props.option.image"
      >
        <img class="option__image" :src="props.option.image" alt="Flower" />
        <div class="details-opt">
          <span>{{ props.option.title }}</span
          ><span>{{ props.option.shortDesc }}</span>
        </div>
      </div>
      <div slot="option" slot-scope="props" class="container-opt">
        <img class="option__image" :src="props.option.image" alt="Flower" />
        <div class="details-opt">
          <span>{{ props.option.title }}</span
          ><span>{{ props.option.shortDesc }}</span>
        </div>
      </div>
    </multiselect>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import { formFieldMixin } from "@/mixins/formFieldMixin.js";

export default {
  mixins: [formFieldMixin],
  props: {
    options: {
      type: Array,
      required: true,
    },
  },
  components: {
    Multiselect,
  },
  data() {
    return {
      currentProduct: {},
    };
  },
  methods: {
    sendValue(selectedOption) {
      this.$emit("set-title", selectedOption.title);
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
.container-opt {
  display: flex;
  justify-content: center;
  align-items: center;
}

.container-opt .details-opt {
  width: 20%;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.container-opt .details-opt span:first-child {
  font-size: 1.25rem;
  padding-bottom: 10px;
  font-weight: 600;
}

.option__image {
  height: 60px;
  width: 60px;
  border-radius: 5px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
