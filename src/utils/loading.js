import { reactive } from "vue";

export const loadingStore = reactive({
  isLoading: false,
  message: "Loading...",
  requestCount: 0,
});

export const showLoading = (message = "Loading...") => {
  loadingStore.requestCount++;
  loadingStore.isLoading = true;
  loadingStore.message = message;
};

export const hideLoading = () => {
  loadingStore.requestCount--;
  if (loadingStore.requestCount <= 0) {
    loadingStore.requestCount = 0;
    loadingStore.isLoading = false;
  }
};
