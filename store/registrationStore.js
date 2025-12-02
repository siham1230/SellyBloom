import { create } from 'zustand';

export const useRegistrationStore = create((set) => ({
  step: 1,
  formData: {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
  setStep: (step) => set({ step }),
  updateFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),
  resetForm: () =>
    set({
      step: 1,
      formData: {
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
    }),
}));
