export default function(){
  this.transition(
    this.fromRoute(null),
    this.toRoute('places.index.new'),
    this.use('toRight'),
    this.reverse('toLeft')
  );
};
