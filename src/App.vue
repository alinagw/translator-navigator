<template>
<div id="app">
    <div class="container-fluid">
        <div class="row">
            <div class="col-4">
                <div id="languages" class="card-shadow d-flex flex-row justify-content-between">
                    <div class="dropdown">
                        <button class="btn dropdown-toggle language-button" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          Language 1
                          </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a class="dropdown-item" href="#">Action</a>
                            <a class="dropdown-item" href="#">Another action</a>
                            <a class="dropdown-item" href="#">Something else here</a>
                        </div>
                    </div>
                    <div class="dropdown">
                        <button class="btn dropdown-toggle language-button" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          Language 2
                          </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a class="dropdown-item" href="#">Action</a>
                            <a class="dropdown-item" href="#">Another action</a>
                            <a class="dropdown-item" href="#">Something else here</a>
                        </div>
                    </div>
                </div>
                <div id="chat-window" class="card-shadow">
                  <div class="d-flex flex-row">
                  <input class="form-control" type="text" placeholder="Default input">
                  <button class="btn btn-primary"><font-awesome-icon icon="microphone" /></button>
                  </div>
                </div>
            </div>
            <div class="col">
                yeet
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'app',
    data() {
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    }
}
</script>

<style>
#app {
    background-color: #F7F7FA;
}

.card-shadow {
    border-radius: 12px;
    -webkit-box-shadow: 0px 4px 16px 0px rgba(69, 91, 99, 0.08);
    -moz-box-shadow: 0px 4px 16px 0px rgba(69, 91, 99, 0.08);
    box-shadow: 0px 4px 16px 0px rgba(69, 91, 99, 0.08);
}

#languages {
    background-color: #2A2E43;
    margin-bottom: 12px;
    padding: 8px 16px;
}

.language-button {
  background-color: transparent;
  color: white;
}

#chat-window {
    height: 300px;
    background-color: white;
    padding: 16px;
}

.divider-v {
  width: 1px;
  background-color: #454F63;
  height: 40px;
}
</style>
