export default (previous, original) => previous.filter((event) => event.status !== 'PLANNED');
