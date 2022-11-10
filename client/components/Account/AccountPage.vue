<template>
  <main>
    <section class="page_content">
      <header class="page_header">
        <h2>settings.</h2>
      </header>
      <ChangeUsernameForm />
      <ChangePasswordForm />
    </section>
    <hr />
    <section class="page_content">
      <h3>delete account</h3>
      <DeleteAccountForm />
    </section>
  </main>
</template>

<style scoped>
hr {
  margin-top: 3rem;
  margin-bottom: 2.15rem;
}
</style>

<script>
import ChangeUsernameForm from '@/components/Account/ChangeUsernameForm.vue';
import ChangePasswordForm from '@/components/Account/ChangePasswordForm.vue';
import DeleteAccountForm from '@/components/Account/DeleteAccountForm.vue';

export default {
  name: 'AccountPage',
  components: {
    ChangeUsernameForm,
    ChangePasswordForm,
    DeleteAccountForm
  }
};
</script>
