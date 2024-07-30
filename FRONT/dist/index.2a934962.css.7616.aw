body.react-confirm-alert-body-element {
  overflow: hidden;
}

.react-confirm-alert-blur {
  -webkit-filter: blur(2px);
}

.react-confirm-alert-overlay {
  z-index: 99;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  -ms-align-items: center;
  opacity: 0;
  background: #ffffffe6;
  justify-content: center;
  align-items: center;
  animation: .5s .2s forwards react-confirm-alert-fadeIn;
  display: flex;
  position: fixed;
  inset: 0;
}

.react-confirm-alert-body {
  text-align: left;
  color: #666;
  background: #fff;
  border-radius: 10px;
  width: 400px;
  padding: 30px;
  font-family: Arial, Helvetica, sans-serif;
  box-shadow: 0 20px 75px #00000021;
}

.react-confirm-alert-svg {
  position: absolute;
  top: 0;
  left: 0;
}

.react-confirm-alert-body > h1 {
  margin-top: 0;
}

.react-confirm-alert-body > h3 {
  margin: 0;
  font-size: 16px;
}

.react-confirm-alert-button-group {
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  justify-content: flex-start;
  margin-top: 20px;
  display: flex;
}

.react-confirm-alert-button-group > button {
  color: #eee;
  cursor: pointer;
  background: #333;
  border: none;
  border-radius: 5px;
  outline: none;
  margin-right: 10px;
  padding: 6px 18px;
  font-size: 12px;
  display: inline-block;
}

@keyframes react-confirm-alert-fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
/*# sourceMappingURL=index.2a934962.css.map */
