// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/*
  Grays out or [whatever the opposite of graying out is called] the option
  field.
*/
function ghost(isDeactivated) {
  options.style.color = isDeactivated ? 'graytext' : 'black';
                                              // The label color.
  options.showNotif.disabled = isDeactivated; // The control manipulability.
  options.autoDetect.disabled = isDeactivated;
}

window.addEventListener('load', function() {
  // Initialize the option controls.
  options.isActivated.checked = JSON.parse(localStorage.isActivated); // The display activation.                                   
  options.showNotif.value = localStorage.showNotif === "true" ? "Yes":"No"; // The notification flag
  options.autoDetect.value = localStorage.autoDetect === "true" ? "Yes":"No"; // The autoDetect flag
                                         

  if (!options.isActivated.checked) { ghost(true); }


  options.isActivated.onchange = function() {
    localStorage.isActivated = options.isActivated.checked;
    ghost(!options.isActivated.checked);
  };

  options.showNotif.onchange = function() {
    localStorage.showNotif = options.showNotif.value == "No" ? false : true;
  };
  options.autoDetect.onchange = function() {
    localStorage.autoDetect = options.autoDetect.value == "No" ? false : true;
  };
});
