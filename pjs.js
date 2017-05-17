$(document).ready(function(){
	var value = 20;
	var whiteball = [];
	var powerball = [];
	var dayArr =[];
	var dateArr = [];
	var numArr =[];
	var day, date;
	var wB = [];
	var pB = [];

	/*DRAW BUTTON*/
	$('.draw').click(function(){
		$('.drawList').slideToggle(300);
	});

	/*NUMBER OF DRAWS from the LIST*/
	$('.numChoice').click(function(){
		value = $(this).val();
		reset();
		power();
	});

	/*NUMBER OF DRAW FROM THE INPUT*/

	$('.submit').click(function(){
		value = $('#input').val();
		reset();
		power();
	});

	/* 	WHITE BALL FREQUENCY BUTTON*/
	$('.btnWB').click(function(){
		$('.outputWB').slideToggle();
		
	});

		/* 	POWER BALL FREQUENCY BUTTON*/
	$('.btnPB').click(function(){
		$('.outputPB').slideToggle();
		
	});


	/*RESET*/
	function reset(){
		 whiteball = [];
		 powerball = [];
		 dayArr = [];
		 dateArr = [];
		 numArr = [];
		$('.output').html('');
		$('.outputWB').html('');
		$('.outputPB').html('');
		
	}

	/*	DAY OF THE WEEK */
	function dayAt(day){
		var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
		return days[day];
	}

	/*	FREQUENCY */
	function frequency(arr, str){
		var arrNew = [];
		
		arr = arr.sort(function(a,b) { return a - b });
		var  current = null;
		var count = 0;
			for(var i=0;i<arr.length;i++){
				var intArr = parseInt(arr[i]);
				if(intArr !== current){
					if(count > 0){
						arrNew[current] = count;
					}
				current = intArr;
				count = 1;
				}
				else{
					count += 1;
				}
			}
			if(count > 0){
			arrNew[current] = count;
			}
	freOutput(arrNew, str);
	}


	/* FREQUENCY OUTPUT*/
	function freOutput(arr, str){

				if(str === 'wb'){
					for(var x=1;x<70;x++){
						if(arr[x]=== undefined){
				 			$('.outputWB').append(x+' : 0<br>');
				 			wB[x] = 0 ;
				 		}
				 		else{	
				 		$('.outputWB').append(x+' : '+arr[x] +'<br>');
				 			wB[x] = arr[x] ;
				 		}
			 		}
				}
				else{
					for(var x=1;x<27;x++){
						if(arr[x]=== undefined){
				 			$('.outputPB').append(x+' : 0<br>');
				 			pB[x] = 0 ;
				 		}
				 		else{	
				 		$('.outputPB').append(x+' : '+arr[x] +'<br>');
				 			pB[x] = arr[x] ;
				 		}
			 		}
			 	}
			

	}

	/*IS IT PRIME*/
	function isPrime(num){
		if(num < 2){
			return false;
		}
		for(var x=2;x<=num;x++){
			if(num % x === 0 && num != x){
				return false;
			}
		}
		return true;
	}

	/*IS IT EVEN*/
	function isEven(num){
		if (num % 2 === 0){
			return true;
		}
		return false;
	}

	/*OUTPUT EVEN and PRIME*/

	function info(num){
						if(isPrime(num)){
							$('.output').append('<span class="p">P</span>');
						}
						else{
							$('.output').append('<span class="p">NP</span>');
						}

						if(isEven(num)){
							$('.output').append('<span class="e">E</span>');
						}
						else{
							$('.output').append('<span class="e">O</span>');
						}
	}

	/*SEGREGATE WHITE AND POWER BALLS*/
	function segregate(str){
		var seg = str.split(" ");

			for(var x=0;x<seg.length;x++){
				if (x < 5){
					whiteball.push(seg[x]);
				}
				else{
					powerball.push(seg[x]);
				}
			}
	}

	/*OUPUT*/
	function output(day, date, num){ ////////////////////////////here
		console.log(wB);

		for(var w=0;w<num.length;w++){	
			$('.output').append('<h5 class="toplabel">'+day[w]+'&nbsp'+date[w]+'</h5>');


			var seg = num[w].split(" ");

				for(var x=0;x<seg.length;x++){

					if (x === 0){
						$('.output').append('<span class="wb">' + seg[x] + ' </span>');
						$('.output').append('<span class="f">' + wB[parseInt(seg[x])] + ' </span>');
							info(seg[x]);
					}
					else if (x < 5){
						$('.output').append('<span class="wb">' + seg[x] + ' </span>');
						$('.output').append('<span class="f">' + wB[parseInt(seg[x])] + ' </span>');
						info(seg[x]);
					}
					else{
						$('.output').append('<span class="pb">' + seg[x] + ' </span>');
						$('.output').append('<span class="f">' + pB[parseInt(seg[x])] + ' </span>');
						info(seg[x]);
						$('.output').append('<br><br><hr>');
					}
				}
		}
	}


	/*POWERBALL FUNCTION*/
	function power(){
		console.log(value);
		var url = 'https://data.ny.gov/resource/hh4x-xmbw.json'; // powerball URL

		$.getJSON(url, function(data){

			for(var x=0 ;x<value;x++){
				date = new Date(data[x].draw_date);
					//date = date.replace('T00:00:00.000',''); //Date
					month = date.getMonth();
					day = date.getDate();
					year = date.getFullYear(); 
					date = (month + 1) + '/' + day +'/'+ year;//Date

			 	day = new Date(data[x].draw_date).getDay(); //5=firday 2=tuesday
					day = dayAt(day)

				segregate(data[x].winning_numbers);
				dateArr.push(date);
				dayArr.push(day);
				numArr.push(data[x].winning_numbers);

				
			}


			frequency(whiteball,'wb');
			frequency(powerball,'pb');
			output(dayArr, dateArr, numArr);

		});

	}


	power();

});