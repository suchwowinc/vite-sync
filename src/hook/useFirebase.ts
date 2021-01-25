import { db } from '../firebase'
// @ts-ignore
import { v4 } from 'uuid';
import {computed, reactive, ref, onMounted } from 'vue';

export const useFirebase = () => {
  const id = ref<string>('');
  const users = reactive<any>([]);
  const cells = reactive<{id: string, x: number, y: number}[]>([]);
  
  onMounted( async () => {
    id.value = v4();
    const usersRef = db.collection('users')
    const userRef = usersRef.doc(id.value);
    
    await userRef.set({id: id.value});
    usersRef.onSnapshot( _users => {
      users.splice(0);
      _users.forEach( _user => {
        users.push( _user.data() );
      })
    });
    
    window.addEventListener('beforeunload', async () => {
      await userRef.delete();
    })
    
    db.collection('cells').onSnapshot( _cells => {
      cells.splice(0);
      _cells.forEach( (_cell:any) => {
        cells.push(_cell.data());
      })
    })
  });
  
  const getUsers = computed( () => {
    return users;
  })
  
  const getCells = computed( () => {
    return cells;
  })
  
  const hasCellByCoordinate = (x: number, y:number ) => {
    const cell = getCells.value.find( cell => {
      return cell.x === x && cell.y === y
    })
    if( !cell ) return false;
    
    return cell.id === id.value;
  }
  
  const colorHex = computed( () => {
    return `#${id.value.slice(0,6)}`;
  })
  
  const selectCell = async (x: number, y: number) => {
    await db.collection('cells').doc(`${x}:${y}`).set({
      id: id.value,
      x,
      y
    });
  };
  
  return {
    id,
    colorHex,
    getUsers,
    getCells,
    hasCellByCoordinate,
    selectCell,
  }
};

