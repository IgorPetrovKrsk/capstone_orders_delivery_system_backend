import axios from "https://cdn.skypack.dev/axios";
const trucksAxios = axios.create({
    baseURL: 'http://127.0.0.1:3000/api/trucks',
    timeout: 5000,
});

const table = document.getElementById('truckTable');
const driverName = document.getElementById('driverName');
const licensePlate = document.getElementById('licensePlate');
const truckStatus = document.getElementById('status');
const capacity = document.getElementById('capacity');

table.addEventListener('click', onTableClick);

async function onTableClick(ev) {
    ev.preventDefault();
    if (ev.target.id.slice(0, 14) === 'btn_del_truck_') {
        let truckId = ev.target.id.split('_');
        truckId = truckId[truckId.length - 1];
        try {
            await trucksAxios.delete(`${truckId}`);
        } catch (error) {
            alert(error.message);
        } finally {
            location.reload(); //reloading current page (it will be more correct just to modify the table using javascript but I'm too tired to do this)
        }
    } else if (ev.target.id === 'btn_add_truck') {
        try {
            await trucksAxios.post('', {
                driverName: driverName.value,
                licensePlate: licensePlate.value,
                status: truckStatus.value,
                capacity: capacity.value
            });
        } catch (error) {
            alert(error.message);
        } finally {
            location.reload(); //reloading current page (it will be more correct just to modify the table using javascript but I'm too tired to do this)
        }

    }
}