export default function(){
  this.transition(
    this.fromRoute('places.index.index'),
    this.toRoute('places.index.new'),
    this.use('toRight'),
    this.reverse('toLeft')
  );
};
