class eightqueengrid3 {
  constructor(){
    this.matrix = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
      ];
  }


  addQueen1(x,y){
    console.log(x,y)
    this.matrix[x][y] = 1;
    console.log(this.matrix[x][y])
  }
  removeQueen1(x,y){
    this.matrix[x][y] = 0;
  }
  getConflicts(){
    var conflicts = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
      ];
     //Horizontal
    for(let i = 0; i < 4; i++){
      for(let j = 0; j < 4; j++){
        if(this.matrix[i][j] == 1){
          for (var column = 0; column < 4; column++) {
            conflicts[i][column]=1;
          }
          conflicts[i][j]=0;
        }
      }
    }

    //Vertical
    for(let i = 0; i < 4; i++){
      for(let j = 0; j < 4; j++){
        if(this.matrix[i][j] == 1){
          for (var row = 0; row < 4; row++) {
            conflicts[row][j]=1;
          }
          conflicts[i][j]=0;
        }
      }
    }
    //Diagonal right-top
    for(let i = 0; i < 4; i++){
      for(let j = 0; j < 4; j++){
        if(this.matrix[i][j] == 1){
          let sum = i+j;
          for (var row = 0; row < 4; row++) {
              for (var column = 0; column < 4; column++) {
                if(row+column==sum)
                  conflicts[row][column]=1;
              }
            }
          conflicts[i][j]=0;
          }
        }
      }

    //Diagonal left-bottom
      for(let i = 0; i < 4; i++){
      for(let j = 0; j < 4; j++){
        if(this.matrix[i][j] == 1){
          let diff = i-j;
          for (var row = 0; row < 4; row++) {
              for (var column = 0; column < 4; column++) {
                if(row-column==diff)
                  conflicts[row][column]=1;
              }
            }
          conflicts[i][j]=0;
          }
        }
      }

    return conflicts;
  }
};

class eightqueenboard3 {
  constructor(parent1){
    this.queen1= 0;
    this.i = 0;
    this.j = -1;
    this.conflict1 = 0;
    this.parent1 = parent1;
    this.eq1 = new eightqueengrid3();
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
    this.grid1 = this.parent1.select("#grid4")
                .append("svg")
                .attr("width",this.height1)
                .attr("height",this.width1);
    this.cells1 = [];
    this.queens1 = [];
    for(var i = 0; i < this.eq1.matrix.length; i++){
      this.cells1.push([]);
      this.queens1.push([]);
      for(var j = 0; j < this.eq1.matrix[i].length; j++){
        this.cells1[i].push(null);
        this.queens1[i].push(null);
      }
    }

    for(let i = 0; i < this.eq1.matrix.length; i++){
      for(let j = 0; j < this.eq1.matrix[i].length; j++){
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
                                    .style('stroke-width','4')}
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

      }
    }
  }
 d3.select('#buttons').select("#restart").on("click",()=>{this.addQueen()});

 d3.select("#stop").on("click",function(){
    d3.select("#grid4").selectAll("svg").remove()
    new eightqueenboard1(d3.select('#grid3')) 
 })
}
  addQueen(){
    this.j = this.j +1
    this.i = 0
    if(this.j<4){
      this.queens1[0][this.j] = this.grid1
              .append("svg:image")
              .attr("xlink:href", "crown.png")
              .attr("width", 70)
              .attr("height", 70)
              .attr("x", this.xLocation1(0,this.j)+5)
              .attr("y", this.yLocation1(0,this.j)+5)
      this.transQueen();
    }
  }
  transQueen(){
       for (var k = 0; k < 2; k++) {
          this.i = this.i +1;
          this.queens1[0][this.j].transition()
                            .delay(1000*k)
                            .duration(1000)
                            .attr("x", this.xLocation1(this.i,this.j)+5)
                            .attr("y", this.yLocation1(this.i,this.j)+5)       
      }
          this.i = this.i +1;
          this.queens1[0][this.j].transition()
                            .delay(1000*k)
                            .duration(1000)
                            .attr("x", this.xLocation1(this.i,this.j)+5)
                            .attr("y", this.yLocation1(this.i,this.j)+5)
                            .on("end",() => {this.checkconflict()}) 
    }

  checkconflict(){
    let conflicts = this.eq1.getConflicts();
    var count = 0
    for (var j = 0; j<4; j++) {
       for (var i = 0; i < 4; i++) {
        if(conflicts[i][j]==0 && j == this.j){
          console.log("if called")
           this.queens1[0][j].transition()
                            .delay(0)
                            .duration(1000)
                            .attr("x", this.xLocation1(i,j)+5)
                            .attr("y", this.yLocation1(i,j)+5)
                            .on("end",()=>{this.addQueen()})
             console.log("Queen added -1")
            this.eq1.addQueen1(i,j);  
            break;
          }
          else if(conflicts[i][j]==1 && j == this.j){
            count = count +1
            console.log(count)
            if(count == 4){                             // if the whole column is one
              this.queens1[0][j].remove();              //remove queen from that column
              for (var k = 0; k < this.eq1.matrix.length; k++) {
                if(this.eq1.matrix[k][j-1]==1){         //find queen from previous column
                  console.log("move called1")         
                  this.eq1.removeQueen1(k,j-1)          //remove previous queen pos
                  if(k+1<4){
                    console.log("Queen added -2")
                    this.eq1.addQueen1(k+1,j-1)         //add queen in new position if not at 4th
                  }
                  console.log(this.eq1.matrix) 
                  this.movedown(k,j-1)                  //if 4, call movedown
                  break;
                }
              }
            }
          }
        }
      }
    }     
    movedown(k,w){
      console.log("move down called")
      console.log(k,w)                                  
      this.j = this.j-1; 
      this.eq1.removeQueen1(k,w)                                                         //decrease the column
      if(k+1<4){                                  //transition queen in new position if not 4. It is already added
        console.log("transition will occure")
         this.queens1[0][w].transition()
                                .delay(1000)
                                .duration(1000)
                                .attr("x", this.xLocation1(k+1,w)+5)
                                .attr("y", this.yLocation1(k+1,w)+5)
                                .on("end",() => {this.addQueen()})
          console.log(this.eq1.matrix)
        }
    else{                                                //if at 4th, then 
        console.log("else called")                          
        this.queens1[0][w].remove();                       //remove the queen
        for (var k = 0; k < this.eq1.matrix.length; k++) {
            if(this.eq1.matrix[k][w-1]==1){            //find element in previous column
              this.eq1.removeQueen1(k,w-1)
              this.queens1[0][w-1].remove()              //remove it                           
              if (k+1<4) {
                 console.log("Queen added -3")
                this.eq1.addQueen1(k+1,w-1)    
                this.j = this.j-1;                     //add queen in new position if not at 4th
                this.queens1[0][w].transition()        //transition queen in new position if not 4.
                            .delay(1000)
                            .duration(1000)
                            .attr("x", this.xLocation1(k+1,w-1)+5)
                            .attr("y", this.yLocation1(k+1,w-1)+5)
                            .on("end",() => {this.addQueen()})            
                  }
            else{
              for (var p = 0; p < this.eq1.matrix.length; p++) {
                if(this.eq1.matrix[p][w-2]==1){
                    this.j = this.j-1;
                    console.log(p+1,w-2)
                     console.log("Queen added -4")
                    this.eq1.addQueen1(p+1,w-2)
                    this.movedown(p,w-2)                 //if k+1 = 4 then again call movedown
                }
              }
                                    
            }
          }                                                
        }                                                  
       }

    }

}
  
var eqb1 = new eightqueenboard3(d3.select('#grid3'))
