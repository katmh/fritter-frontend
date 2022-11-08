<!-- Form for creating collaborative moments (block style) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'CreateCMForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/cm',
      method: 'POST',
      hasBody: true,
      fields: [
        {id: 'title', label: 'Title', value: ''},
        {id: 'description', label: 'Description', value: ''},
        {id: 'admins', label: 'Admins', value: ''},
        {id: 'editors', label: 'Editors', value: ''}
      ],
      title: 'Create a collaborative moment',
      callback: () => {
        console.log('created a CM');
        // TODO
      }
    }
  }
}
</script>