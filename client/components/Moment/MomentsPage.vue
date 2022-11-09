<template>
  <main>
    <section class="page_content">
      <header class="page_header">
        <h2>my moments.</h2>
      </header>
      <CreateCMForm />
    </section>
    <section>
      Hello
    </section>
  </main>
</template>

<script>
import CreateCMForm from '@/components/CM/CreateCMForm.vue';

export default {
  name: 'MomentsPage',
  components: {
    CreateCMForm
  }
}
</script>