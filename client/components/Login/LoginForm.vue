<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'LoginForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/users/session',
      method: 'POST',
      hasBody: true,
      setUsername: true,
      fields: [
        {id: 'username', label: 'username', value: ''},
        {id: 'password', label: 'password', value: ''}
      ],
      buttonLabel: 'sign in',
      callback: () => {
        this.$router.push({name: 'Home'});
        this.$store.commit('alert', {
          message: 'You are now signed in!', status: 'success'
        });
      }
    };
  }
};
</script>
