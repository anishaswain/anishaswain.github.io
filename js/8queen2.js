  class eightqueengrid2 {
  constructor(N){
    this.N = N;
    this.matrix1 = [];
    for (var i = 0; i < this.N; i++) {
      this.matrix1.push([])
      for (var j = 0; j < this.N; j++) {
        this.matrix1[i][j] =0
      }
    }
  }


  addQueen1(x,y){
    this.matrix1[x][y] = 1;
  }
  removeQueen1(x,y){
    this.matrix1[x][y] = 0;
  }
  getConflicts1(){
    var conflicts1 = [];
    for (var i = 0; i < this.N; i++) {
      conflicts1.push([])
      for (var j = 0; j < this.N; j++) {
        conflicts1[i][j] =0
      }
    }
    //Horizontal
    for(let i = 0; i < this.N; i++){
      let found = false;
      let found_i,found_j;
      for(let j = 0; j < this.N; j++){
        if(this.matrix1[i][j] == 1){
          if(found){
            for(let y = found_j; y <= j; y++){
              conflicts1[i][y] = 1;
            }
          }else{
            found = true;
            found_i = i;
            found_j = j;
          }
        }
      }
    }

    //Vertical
    for(let j = 0; j < this.N; j++){
      let found = false;
      let found_i,found_j;
      for(let i = 0; i < this.N; i++){
        if(this.matrix1[i][j] == 1){
          if(found){
            for(let x = found_i; x <= i; x++){
              conflicts1[x][j] = 1;
            }
          }else{
            found = true;
            found_i = i;
            found_j = j;
          }
        }
      }
    }
    //Diagonal right-top
    for(let sum = 0; sum <=(2*this.N-1); sum++){
      let found = false;
      let found_i,found_j;
      for(let i = 0; i <= this.N-1 && i <= sum; i++){
        let j = sum-i;
        if(this.matrix1[i][j] == 1){
          if(found){
            for(let x = found_i, y = found_j; x <= i; x++,y--){
              conflicts1[x][y] = 1;
            }
          }else{
            found = true;
            found_i = i;
            found_j = j;
          }
        }
      }
    }

    //Diagonal left-bottom
    for(let diff = -this.N-1; diff <=this.N-1; diff++){
      let found = false;
      let found_i,found_j;
      let i = 0;
      if(diff > i){i = diff;}
      let j = 0;
      if(i-diff > j){j = i-diff}
      for(; i <= this.N-1 && j <= this.N-1; j++,i++){
        if(this.matrix1[i][j] == 1){
          if(found){
            for(let x = found_i, y = found_j; x <= i; x++,y++){
              conflicts1[x][y] = 1;
            }
          }else{
            found = true;
            found_i = i;
            found_j = j;
          }
        }
      }
    }
    return conflicts1;
  }
};


class eightqueenboard2 {
  constructor(parent1){
    this.queen1= 0;
    this.conflict1 = 0;
    this.parent1 = parent1;
    this.N = document.getElementById("slide").value ;
    this.eq1 = new eightqueengrid2(this.N);
    this.height1 = 320;
    this.width1 = 320;
    this.cellWidth1 = this.height1/this.N;
    this.cellHeight1 = this.height1/this.N;
    this.xLocation1 = function(i,j){
      return j*this.cellWidth1;
    }
    this.yLocation1 = function(i,j){
      return i*this.cellHeight1;
    }
    this.draw1();
    this.draw2();
  }

  draw2(){
    this.grid2 = this.parent1.select("#game")
                .append("svg")
                .attr("width",this.height1)
                .attr("height",this.width1);
    this.cells1 = [];
    this.queens1 = [];
    for(var i = 0; i < this.eq1.matrix1.length; i++){
      this.cells1.push([]);
      this.queens1.push([]);
      for(var j = 0; j < this.eq1.matrix1[i].length; j++){
        this.cells1[i].push(null);
        this.queens1[i].push(null);
      }
    }

    for(let i = 0; i < this.eq1.matrix1.length; i++){
      for(let j = 0; j < this.eq1.matrix1[i].length; j++){
        if(j%2== i%2){this.cells1[i][j] = this.grid2.append('rect')
                                    .attr('class','square')
                                    .attr('x',this.xLocation1(i,j))
                                    .attr('y',this.yLocation1(i,j))
                                    .attr('height',this.cellHeight1)
                                    .attr('width',this.cellWidth1)
                                    .attr('i',i)
                                    .attr('j',j)
                                    .style('fill','#fff')
                                    .style('stroke','blue')
                                    .style('stroke-width','4')
                                    .on('click',() => {this.eventHandler1(i,j)})}
        else{this.cells1[i][j] = this.grid2.append('rect')
                                    .attr('class','square')
                                    .attr('x',this.xLocation1(i,j))
                                    .attr('y',this.yLocation1(i,j))
                                    .attr('height',this.cellHeight1)
                                    .attr('width',this.cellWidth1)
                                    .attr('i',i)
                                    .attr('j',j)
                                    .style('fill','#000')
                                    .style('stroke','blue')
                                    .style('stroke-width','4')
                                    .on('click',() => {this.eventHandler1(i,j)})}
      }
    }
  }
    draw1(){
    var dataset = [4,5,6,7,8]
     var slider = document.getElementById("slide");
     var output = document.getElementById("demo");
      slider.oninput = function() {
        this.N = this.value
         d3.select('#grid2').selectAll('svg').remove()
        var eqb1 = new eightqueenboard2(d3.select('#grid2'))
      } 
    console.log(this.N)
    this.N = slider.value
    var svg1 = this.parent1.select("#slidebox").select("#axis")
                .append("svg")
                .attr("width",320)
                .attr("height",20);
    for (var k = 0; k < 5; k++) {
      svg1.selectAll("text")
              .data(dataset)
              .enter()
              .append("text")
              .text(function(d) {
                return d;
              })
              .attr("x",function(d,i){
                return i*77;
              })
              .attr("fill","black")
              .attr("y",20)
    }

  }

  eventHandler1(i,j){
    if(this.eq1.matrix1[i][j] == 0) {
      this.addQueen1(i,j);
      this.eq1.addQueen1(i,j);
      this.repaint1();
    }else{
      this.removeQueen1(i,j);
      this.eq1.removeQueen1(i,j);
      this.repaint1();
    }
  }

  addQueen1(i,j){
    this.queen1 = this.queen1+1;
    this.queens1[i][j] = this.grid2.append("svg:image")
              .attr("xlink:href", "crown.png")
              .attr("width", this.cellWidth1-5)
              .attr("height", this.cellWidth1-5)
              .attr("x", this.xLocation1(i,j)+4)
              .attr("y", this.yLocation1(i,j)+5)
              .on('click',() => {this.eventHandler1(i,j)})
  }

  removeQueen1(i,j){
    this.queens1[i][j].remove();
    this.queen1 = this.queen1 - 1;
  }
  repaint1(){
    console.log("repaint called")
    console.log(this.queen1)
    console.log(this.conflict1)
    let conflicts1 = this.eq1.getConflicts1();
    //console.log("conflict length" + conflicts.length)
    for(let i = 0; i < conflicts1.length;i++){
      for(let j = 0; j < conflicts1[i].length; j++){
        if(conflicts1[i][j]){
          this.cells1[i][j].style('fill','#eb0000a8');
        }else{
           if(j%2 == i%2){
          this.cells1[i][j].style('fill','#fff');}
          else
            this.cells1[i][j].style('fill','#000');
        }
      }
    }
    if(this.queen1==8){
      for(let i = 0; i < conflicts1.length;i++){
        for(let j = 0; j < conflicts1[i].length; j++){
          if (conflicts1[i][j]==0) {
            this.conflict1 = this.conflict1+1;
          }
        }
      }
      if(this.conflict1==64){ 
      alert("wow! congrats you places all queens successfully");
        }
      else
        alert("You lost! try again")
      }
    }
  }
  
var eqb1 = new eightqueenboard2(d3.select('#grid2'))
d3.select("#restart")
  .on("click",function() {
    restarting();
    reassigning();
  })
function restarting() {
  d3.select('#grid2').selectAll('svg').remove()
  }
function reassigning() {
  var eqb1 = new eightqueenboard2(d3.select('#grid2'))
  }










