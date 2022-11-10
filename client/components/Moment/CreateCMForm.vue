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
        {id: 'title', label: 'title', value: ''},
        {id: 'description', label: 'description', value: ''},
        {id: 'admins', label: 'admins', value: ''},
        {id: 'editors', label: 'editors', value: ''}
      ],
      buttonLabel: 'create',
      callback: () => {
        console.log('created a CM');
        // TODO
      }
    }
  }
}
</script>