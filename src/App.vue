<template>
  <div class="container">
    <div>
      あなたのID: <span class="id" :style="`background: ${colorHex}`">{{ id }}</span>
      {{ colorHex }}
    </div>
    <div class="board">
      <div class="row" v-for="y in 5">
        <div class="column" v-for="x in 5">
          <div :style="hasCellByCoordinate(x-1,y-1)?`background: ${colorHex}`:''" class="cell" @click="selectCell(x-1,y-1)"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useFirebase } from "./hook/useFirebase";

export default {
  setup(){
    const { id, getUsers, getCells, selectCell, colorHex, hasCellByCoordinate } = useFirebase()

    return {
      id,
      users: getUsers,
      cells: getCells,
      selectCell,
      colorHex,
      hasCellByCoordinate
    }
  }
}
</script>

<style>
.id {
  padding: 4px;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.board {
  margin-top: 20px;
}

.row {
  display: flex;
}

.cell {
  width: 80px;
  height: 80px;
  background: rgba(0,0,0,0.2);
  padding: 4px;
  transition: opacity 400ms;
}

.cell:hover {
  cursor: pointer;
  opacity: 0.6;
}
</style>
