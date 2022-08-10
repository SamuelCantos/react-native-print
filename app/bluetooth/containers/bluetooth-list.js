import React, { useEffect } from 'react'
import {
    View,
    Text,
    FlatList,
    TouchableHighlightBase,
    TouchableOpacity,
} from 'react-native'
import Layout from '../components/bluetooth-list-layout'
import Empty from '../components/empty';
import Toggle from '../components/toggle';
import Subtitle from '../components/subtitle';
import BluetoothSerial from 'react-native-bluetooth-serial-next';
import Device from '../components/device';
import { useState } from 'react';
import SamplePrint from '../components/sample-print';


function BluetoothList(props) {

    const [lista, setLista] = useState([])
    const [bolEnable, setBolEnable] = useState(false)
    const [impresora, setImpresora] = useState({})

    const renderEmpty = () => {
        <Empty text='No hay dispositivos' />
    }

    const renderItem = ({ item }) => {
        /*   console.log(item.name, 'item del renderItem') */
        return (
            <Device {...item} iconLeft={require('../iconos/laptop.png')} iconRight={'../iconos/tuerca.png'} onPress={() => handlePress(item)} />
        )
    }

    const enableBluetooth = async () => {
        try {
            await BluetoothSerial.requestEnable()
            const lista = await BluetoothSerial.list();
            await BluetoothSerial.stopScanning();
            setBolEnable(true)
            setLista(lista)
        } catch (error) {
            console.log(error)
        }
    }

    const disableBluetooth = async () => {
        try {
            await BluetoothSerial.disable();
            await BluetoothSerial.stopScanning();
            setBolEnable(false);
            setLista([])
        } catch (error) {
            console.log(error)
        }
    }

    const toggleBluetooth = value => {
        if (value) {
            return enableBluetooth()
        }
        disableBluetooth()
    }

    const handlePress = async (item) => {
        /* console.log('anda el onPress')
        console.log(item.id) */
        try {
            const deviceConnected = await BluetoothSerial.connect(item.id);
            const isConnected = await BluetoothSerial.isConnected(item.id)
            setImpresora(deviceConnected)
            if (isConnected) {
                console.log('esta conectado a', item.name)
            } else {
                console.log('palometa astral')
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        async function init() {
            const enable = await BluetoothSerial.requestEnable();
            const lista = await BluetoothSerial.list();
            setLista(lista)
            setBolEnable(enable)
            console.log(lista)
        }
        init()

        return () => {
            async function remove() {
                await BluetoothSerial.stopScanning();
                console.log('termino scanner')
            }

            remove();
        }
    }, [])


    return (
        <Layout title='Bluetooth'>
            <Toggle value={bolEnable} onValueChange={toggleBluetooth} />
            <Subtitle title='Lista de Dispositivos' />
            <TouchableOpacity>
                <FlatList
                    data={lista}
                    ListEmptyComponent={renderEmpty}
                    renderItem={renderItem} />
            </TouchableOpacity>
        </Layout>
    )
}


export default BluetoothList;