$(document).ready(function(){
    // save element of tag click( use for detail titile)
    var elemTagClick;
    // save extend tag show
    var $currentExtendTag = null;
    // save datepicker current
    var datepickerCurrent ;
    // set size of div fit to screen 
    var widthOfNav = 52;
    var widthOfFunction = 250;
    var widthOfWindow = $(window).width();
    var widthOfContent = widthOfWindow - widthOfNav - widthOfFunction;
    $(".content").css({
        "width": widthOfContent
      });
    $(window).resize(function() {
        var windowWidth = $(window).width();
        var widthOfContent = windowWidth - widthOfNav - widthOfFunction;

        // Dynamically set the size of the div
        $(".content").css({
            "width": widthOfContent
          });
    });
   
    //--end set size of div fit to screen 

    $(".content").css({
      "width": widthOfContent
    });
    $(".tagTitle").click(function(){

        $(this).siblings(".tagBoxContent").fadeToggle(50);
    })
    $(".content-main-tag-title").click(function(){

        $(this).siblings(".content-main-tag-content ").fadeToggle(50);
    })
    $(".content-main-tagComplete-title").click(function(){

        $(this).siblings(".content-main-tagComplete-content ").fadeToggle(50);
    })
    $(".content-main-tag i.icon").mouseenter(function() {
        console.log("abc");
        $(this).siblings().css("color", "black");
    });

    // nav icon clik
    $(".tagBox ").click(function(){
        $(".tagBox ").removeClass("tagBoxHightlight");
        $(this).addClass("tagBoxHightlight");
    })
    //-end nav icon clik

      // function Click event on .form-control
      function setBorderColorForTag(elem){
        $(".tag").removeClass("tagClick");
        $(".tagIcon").removeClass("tagClick");
        $(".tagDate").removeClass("tagClick");
        elem.children(".tag").addClass("tagClick");
        elem.children(".tagIcon").addClass("tagClick");
        elem.children(".tagDate").addClass("tagClick");
      }

      // --end function Click event on .form-control


        // date picker for tag extent
  
        $(".datepicker").datepicker({
            showOn: "button",
            buttonText: "Select date",
            inline: true,
            onSelect: function(dateText, inst) {
                var selectedDate = new Date(dateText);
                var year = selectedDate.getFullYear();
                var month = ('0' + (selectedDate.getMonth() + 1)).slice(-2); // Adding 1 because getMonth() returns 0-11
                var day = ('0' + selectedDate.getDate()).slice(-2);
    
                var formattedDate = year + '-' + month + '-' + day;
                elemTagClick.closest(".input-group").find(".tagDate").text(formattedDate);
                $(".content-detail-header-date .tagDate").html(elemTagClick.closest(".input-group").find(".tagDate").html());
            }
        });
        //-- end date picker for tag extent
          
        // Show the datepicker when the button is clicked
        $(".CustomeChoose").click(function() {
            $(this).closest(".extendTag").find(".datepicker").toggle(); 
            // Check if the datepicker inside the closest .extendTag is visible

        });
        $(".datePickDetail").click(function() {
            $(this).closest(".content-detail").find(".datepicker").toggle(); 
            // Check if the datepicker inside the closest .extendTag is visible
            datepickerCurrent = $(this).closest(".content-detail").find(".datepicker").is(":visible") ? 
            $(this).closest(".content-detail").find(".datepicker") : null;
        });

        //-- end Show the datepicker when the button is clicked
        // hide datepicker when click outside
        $(document).click(function(event) {

            if (datepickerCurrent && !$(event.target).closest(".datePickDetail").length) {
              //  console.log("check: " + datepickerCurrent)
                datepickerCurrent.hide(); 

            }
        });
        // hide datepicker when click outside

        //even extend card

            // click show and hide extend card
        $(".tagIcon").click(function() {
           $(".extendTag").hide();
           elemTagClick.find(".extendTag").toggle();
            
        });
        

         // Function to hide the .extendTag
        function hideExtendTag() {
            if ($currentExtendTag) {
                $currentExtendTag.find(".datepicker").hide(); 
                $currentExtendTag.hide();
                $currentExtendTag = null;

            }
        }
    
            // Click event for .tagIcon to toggle .extendTag
        $(".tagIcon").click(function(event) {
            var $extendTag = $(this).closest(".content-main-addTask, .content-main-tag-content, .content-main-tagComplete-content, .content-detail-header").find(".extendTag");
    
            if ($currentExtendTag && $currentExtendTag.is($extendTag)) {
                // If the clicked .extendTag is already visible, hide it
                hideExtendTag();
            } else {
                // Hide the previously visible .extendTag
                hideExtendTag();
                // Show the clicked .extendTag and update the current one
                $extendTag.show();
                $currentExtendTag = $extendTag;
            }
        });
    
            // Click event on the document to hide .extendTag when clicking outside
            $(document).click(function(event) {
                if ($currentExtendTag && !$(event.target).closest(".extendTag, .tagIcon").length) {
                    hideExtendTag();
                }
            });



        //--end click show and hide extend card
        //-- end even extend card

        // set color for tag
        function setColorForTag(elem, color){
            elem.find(".tag").css("border-color", color);
            elem.find(".tagIcon").css("border-color", color);
            elem.find(".input-group-text").css("border-color", color);
            elem.find("input").css("border-color", color);
            elem.find(".tagDate").css("color", color);
            elem.find(".addIcon").css("border-color", color);

        }
        $(".boxIcon").click(function() {
            var color = $(this).css('color'); // Use a color stored in a data attribute or another way to get the color
            setColorForTag( elemTagClick.closest(".input-group"),color);
            setContentForDetail(elemTagClick.closest(".input-group"));
            //set color for date icon
            $(this).closest(".extendTag-main").find(".dateChoose").find(".boxIcon").css("color", color);
        });
        
        //-- end set color for tag

        //set date for tagDate
        $(".todayChoose").click(function(){
            var currentDate = new Date();
            var year = currentDate.getFullYear();
            var month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Adding 1 because getMonth() returns 0-11
            var day = ('0' + currentDate.getDate()).slice(-2);

            var formattedDate = year + '-' + month + '-' + day;
            elemTagClick.closest(".input-group").find(".tagDate").text(formattedDate);
            setContentForDetail($(this).closest(".content-main-tag-content").find(".input-group"));
            setContentForDetail($(this).closest(".content-main-tagComplete-content").find(".input-group"));
        })
        $(".tomorowChoose").click(function(){
            var currentDate = new Date();
            var tomorrow = new Date();
            tomorrow.setDate(currentDate.getDate() + 1);
            var year = tomorrow.getFullYear();
            var month = ('0' + (tomorrow.getMonth() + 1)).slice(-2); // Adding 1 because getMonth() returns 0-11
            var day = ('0' + tomorrow.getDate()).slice(-2) ;

            var formattedDate = year + '-' + month + '-' + day;
            elemTagClick.closest(".input-group").find(".tagDate").text(formattedDate);
            setContentForDetail($(this).closest(".content-main-tag-content").find(".input-group"));
            setContentForDetail($(this).closest(".content-main-tagComplete-content").find(".input-group"));
        })
        //-- end set date for tagDate
        // set width of span in sub tag
               function setWidthForSubTag(){
                $(".subTagContent").each(function() {
                    $(this).width($(this).closest("div").width() - 80);
                    $(this).width($(this).closest(".subTagBlock").width() - 100);
                });
        
                $(".addSubTagContent").each(function() {
                    $(this).width($(this).closest("div").width() - 70);
                    $(this).width($(this).closest(".addSubTagBlock").width() - 70);
                });
            }
        
        // --end even detail contend
    
        // set display block for detail 
            function setUpDetailshow(){
                $(".content-detail").css("display", "block");
    
                setWidthForSubTag();
            }
            // --end set display block for detail 
    
        // even detail contend

        function setContentForDetail(element){
            //set color for header detail
            $(".content-detail-header").css("color", element.find(".tagDate").css("color"));
            var a = element.find(".tagDate").css("color");
            //set date for header detail
            $(".content-detail-header-date .tagDate").html(element.find(".tagDate").html());
            // set titile for detail
            var content = element.find(".tag").val();
            $(".content-detail-content-title").html(content);
            }
        $(".content-main-addTask .input-group").click(function(){
            elemTagClick = $(this).find("input");
            $(".content-detail").css("display", "none");
            //set border color for tag
            setBorderColorForTag($(this));
        })
        $(".content-main-tagComplete-content .input-group").click(function(){
            elemTagClick = $(this).find(".tag");
            //show detail
            setUpDetailshow()

            setContentForDetail($(this));
            //set border color for tag
            setBorderColorForTag($(this));

        });       
        $(".content-main-tag-content .input-group").click(function(){
            elemTagClick = $(this).find(".tag");
            console.log(elemTagClick);
            //show detail
            setUpDetailshow()
            setContentForDetail($(this));
            //set border color for tag
            setBorderColorForTag($(this));
        });
        // set content detail when tag change

        $(".tag").keyup(function(){
            $(".content-detail-content-title").html($(this).val())
        })
        // set tag content  when detail change
        $(".content-detail-content-title ").keyup(function(){

            elemTagClick.val($(this).text())
        })


})