class eightqueengrid1 {
  constructor(){
    this.matrix1 = [
       [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0]
      ];
  }


  addQueen1(x,y){
    this.matrix1[x][y] = 1;
  }
  removeQueen1(x,y){
    this.matrix1[x][y] = 0;
  }
  getConflicts1(){
    var conflicts1 = [
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0]
      ];
    //Horizontal
    for(let i = 0; i < 5; i++){
      let found = false;
      let found_i,found_j;
      for(let j = 0; j < 5; j++){
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
    for(let j = 0; j < 5; j++){
      let found = false;
      let found_i,found_j;
      for(let i = 0; i < 5; i++){
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
    for(let sum = 0; sum <=8; sum++){
      let found = false;
      let found_i,found_j;
      for(let i = 0; i <= 4 && i <= sum; i++){
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
    for(let diff = -4; diff <=4; diff++){
      let found = false;
      let found_i,found_j;
      let i = 0;
      if(diff > i){i = diff;}
      let j = 0;
      if(i-diff > j){j = i-diff}
      for(; i <= 4 && j <= 4; j++,i++){
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

class eightqueenboard1 {
  constructor(parent1){
    this.queen1= 3;
    this.conflict1 = 0;
    this.parent1 = parent1;
    this.eq1 = new eightqueengrid1();
    this.height1 = 320;
    this.width1 = 320;
    this.cellWidth1 = 80;
    this.cellHeight1 = 80;
    this.xLocation1 = function(i,j){
      return j*this.cellWidth1;
    }
    this.yLocation1 = function(i,j){
      return i*this.cellHeight1;
    }
    this.draw1();
  }

  draw1(){
    this.grid1 = this.parent1
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
        if(j%2== i%2){this.cells1[i][j] = this.grid1.append('rect')
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
        else{this.cells1[i][j] = this.grid1.append('rect')
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

    this.queens1[0][0] = this.grid1.append("svg:image")
              .attr("xlink:href", "crown.png")
              .attr("width", 70)
              .attr("height", 70)
              .attr("x", this.xLocation1(0,0)+5)
              .attr("y", this.yLocation1(0,0)+5)
              .on('click',() => {this.eventHandler1(i,j)})
    this.queens1[2][1] = this.grid1.append("svg:image")
              .attr("xlink:href", "crown.png")
              .attr("width", 70)
              .attr("height", 70)
              .attr("x", this.xLocation1(2,1)+5)
              .attr("y", this.yLocation1(2,1)+5)
              .on('click',() => {this.eventHandler1(i,j)})
    this.queens1[4][2] = this.grid1.append("svg:image")
              .attr("xlink:href", "crown.png")
              .attr("width", 70)
              .attr("height", 70)
              .attr("x", this.xLocation1(4,2)+5)
              .attr("y", this.yLocation1(4,2)+5)
              .on('click',() => {this.eventHandler1(i,j)})
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
    this.queens1[i][j] = this.grid1.append("svg:image")
              .attr("xlink:href", "crown.png")
              .attr("width", 70)
              .attr("height", 70)
              .attr("x", this.xLocation1(i,j)+5)
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
    if(this.queen1==5){
      for(let i = 0; i < conflicts1.length;i++){
        for(let j = 0; j < conflicts1[i].length; j++){
          if (conflicts1[i][j]==0) {
            this.conflict1 = this.conflict1+1;
          }
        }
      }
      if(this.conflict1==25){ 
      alert("wow! congrats you places all queens successfully");
        }
      else
        alert("You lost! try again")
      }
    }
  }
  
var eqb1 = new eightqueenboard1(d3.select('#grid1'))
