chrome.runtime.onMessage.addListener(
    function(link, sender, sendResponse) {
      var previous = $("textarea[name='comment[body]']").val();
      $("textarea[name='comment[body]']").val(previous + "\n\n" + link);
    });
