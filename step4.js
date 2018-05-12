

sideFilterState = {glass:true, acryl:true, opaque:true};
colorFilterState = {black:true, white:true};
popularIsSortPrimary = true; // true for popular as primary
sortState = {price:false, popular:true}; // true for 내림차순


$( document ).ready(function() {



  $('.special.cards .image').dimmer({
    on: 'hover'
  });


  $(".rating").rating('disable');

  $( ".sideFilter" ).controlgroup();

  $( ".sideFilter" ).on('change', function(){
    sideFilterState.glass = $("#d_glass").is(":checked");
    sideFilterState.acryl = $("#d_acryl").is(":checked");
    sideFilterState.opaque = $("#d_opaque").is(":checked");
    reloadCase();
  });

  $( ".colorFilter" ).controlgroup()

  $( ".colorFilter" ).on('change', function(){
    colorFilterState.black = $('#d_black').is(":checked");
    colorFilterState.white = $('#d_white').is(":checked");
    reloadCase();
  });


  $( "#d_sort_price_button" ).on('click', function(){
    $(this).blur();

    if(popularIsSortPrimary){
      // 가격이 1순위가 아니었을 경우
      popularIsSortPrimary = false;
      $("#d_sort_price_button").removeClass("basic");
      $("#d_sort_popular_button").addClass("basic");
      //$("#d_sort_popular_icon").removeClass("down").removeClass("up");
    }

    if(sortState.price){
      // 원래 가격이 내림차순 -> 오름차순으로
      $("#d_sort_price_icon").removeClass("down").addClass("up");
    }else{
      // 원래 가격이 오름차순 -> 내림차순으로
      $("#d_sort_price_icon").removeClass("up").addClass("down");
    }

    sortState.price = !sortState.price;
    reloadCase();

  });


  $( "#d_sort_popular_button" ).on('click', function(){
    $(this).blur();

    if(!popularIsSortPrimary){
      // 인기도가 1순위가 아니었을 경우
      popularIsSortPrimary = true;
      $("#d_sort_price_button").addClass("basic");
      $("#d_sort_popular_button").removeClass("basic");
      //$("#d_sort_price_icon").removeClass("down").removeClass("up");
    }

    if(sortState.popular){
      // 원래 인기도가 내림차순 -> 오름차순으로
      $("#d_sort_popular_icon").removeClass("down").addClass("up");
    }else{
      // 원래 가격이 오름차순 -> 내림차순으로
      $("#d_sort_popular_icon").removeClass("up").addClass("down");
    }

    sortState.popular = !sortState.popular;
    reloadCase();

  });


});

backup = []

function selectCase(oid, id){
  var realId = $(id).attr('id');
  var idx = realId.split('case')[1];
  var oid = parseInt(oid);

  //console.log(idx);

  if($(id).hasClass('active')){
    // 선택 해제
    composition.set('CASE', -1, true, true);
    $(id).addClass('inverted');
    $(id).removeClass('active');
    $('#m_selected_case' + idx).attr('hidden', true);
    $('#m_pricetext_case' + idx).attr('hidden', false);

    for(var i = 0; i<composition.CASES.length; i++){
      thisidx = ("0" + i.toString()).slice(-2);
      $('#m_button_case' + thisidx).html(backup[i]);
    }

  }else{
    // 선택
    composition.set('CASE', oid, true, true);
    //console.log($('#m_price_case03').html());
    //console.log($(realId.replace(/button/,'price')).html());

    price = db_CASE[parseInt(idx)].price;

    for(var i = 0; i<composition.CASES.length; i++){
      thisidx = ("0" + i.toString()).slice(-2);
      temp = "#m_button_case" + thisidx;
      $(temp).addClass('inverted');
      $(temp).removeClass('active');
      $('#m_selected_case' + thisidx).attr('hidden', true);
      $('#m_pricetext_case' + thisidx).attr('hidden', false);

      difference = db_CASE[i].price - price;
      //console.log(difference);

      if(difference > 0){
        $('#m_cart_case' + thisidx).removeClass('cheap').addClass('expensive');
        $('#m_price_case' + thisidx).removeClass('cheap').addClass('expensive');
        $('#m_price_case' + thisidx).html('+ ₩ ' + difference.toLocaleString('en'));
      }else{
        $('#m_cart_case' + thisidx).removeClass('expensive').addClass('cheap');
        $('#m_price_case' + thisidx).removeClass('expensive').addClass('cheap');
        $('#m_price_case' + thisidx).html('- ₩ ' + (-1 * difference).toLocaleString('en'));
      }

    }

    $(id).removeClass('inverted');
    $(id).addClass('active');
    $('#m_selected_case' + idx).attr('hidden', false);
    $('#m_pricetext_case' + idx).attr('hidden', true);
  }
}

function loadCase(){

  caseNumber = 0;

  for(var i = 0; i < composition.CASES.length; i++){
    $('#m_cards').append(composition.CASES[i]);

    caseNumber++;

    backup.push($('#m_button_case' + ("0" + i.toString()).slice(-2)).html());
    //console.log(backup[i]);
    $('.special.cards .image').dimmer({
      on: 'hover'
    });

    $(".rating").rating('disable');
  }
}

function reloadCase(){

  $('#m_cards').empty();

  caseNumber = 0;


  filtered = db_CASE.filter(caseFilter);
  filtered.sort(caseSort);

  for(var i = 0; i < filtered.length; i++){

    caseNumber++;

    j = filtered[i].index;

    $('#m_cards').append(composition.CASES[j]);

    backup.push($('#m_button_case' + ("0" + j.toString()).slice(-2)).html());
    //console.log(backup[i]);
    $('.special.cards .image').dimmer({
      on: 'hover'
    });

    $(".rating").rating('disable');
  }

  if(composition.CASE != -1){
    selectCase( ("0"+composition.CASE.toString()).slice(-2), "#m_button_case" + ("0"+composition.CASE.toString()).slice(-2) )
  }

}

function caseSort(a,b){
  var result;
  if(popularIsSortPrimary){
    // 인기순 정렬
    if(a.popular > b.popular){
      result = 1;
    }else if(a.popular < b.popular){
      result = -1;
    }else{
      result = 0;
    }

    if(sortState.popular){
      // 인기순 내림차순일 경우
      result *= -1;
    }

    if(result == 0){
      // 인기도가 동순위일 경우

      if(a.price > b.price){
        result = -1;
      }else{
        result = 1;
      }

      if(!sortState.price){
        // 가격순 오름차순일 경우
        result *= -1;
      }
    }

    return result;

  }else{
    // 가격순 졍렬
    if(a.price > b.price){
      result = 1;
    }else if(a.price < b.price){
      result = -1;
    }else{
      result = 0;
    }

    if(sortState.price){
      // 가격순 내림차순일 경우
      result *= -1;
    }

    if(result == 0){
      // 가격이 동순위일 경우

      if(a.popular > b.popular){
        result = -1;
      }else{
        result = 1;
      }

      if(!sortState.popular){
        // 인기순 오름차순일 경우
        result *= -1;
      }
    }

    return result;
  }
}

function caseFilter(db){
  //console.log(db);
  sideFilter = (db.side.includes("유리") && sideFilterState.glass) ||
                (db.side.includes("아크릴") && sideFilterState.acryl) ||
                (db.side == "" && sideFilterState.opaque);

  colorFilter = (db.color && colorFilterState.black) ||
                (!db.color && colorFilterState.white);

  return sideFilter && colorFilter;
}

function isGlass(db){
  return db.side.includes("유리");
}

function isAcryl(db){
  return db.side.includes("아크릴");
}

function isOpaque(db){
  return db.size == "";
}
