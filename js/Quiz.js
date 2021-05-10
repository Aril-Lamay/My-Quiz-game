class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    question.hide();

    background("yellow");

    fill('Red');
    textSize(30);
    text("Result of the quiz",300,50);

    Contestant.getContestantInfo();


    if(allContestants !== undefined){
      fill('Black');
      textSize(30);
      text("*Note : Contestant in Red color has given the correct answer",50,250);

      for(var plr in allContestants){
        var correctAnswer = "2";
        if(correctAnswer === allContestants[plr].answer){
          fill('Red');
          text(allContestants[plr].name +":"+allContestants[plr].answer,200,300);
        }
        else{
          fill('Green');
          text(allContestants[plr].name +":"+allContestants[plr].answer,200,350);
        }
      }
    }
  
  }

}
