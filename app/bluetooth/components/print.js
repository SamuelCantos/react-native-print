import { PosPrinter, PosPrintData, PosPrintOptions } from "electron-pos-printer";
import { Button, View } from "react-native";

const options = {
    preview: false,               // Preview in window or print
    width: '170px',               //  width of content body
    margin: '0 0 0 0',            // margin of content body
    copies: 1,                    // Number of copies to print
    printerName: '58HB6',        // printerName: string, check with webContent.getPrinters()
    timeOutPerLine: 400,
    pageSize: { height: 301000, width: 71000 }  // page size
}

const data = [
    {
        type: 'text',
        value: 'Imprime o no wacho',
        style: 'font-size: 14px',
    }, {
        type: 'barCode',
        value: 'HB4587896',
        height: 12,                     // height of barcode, applicable only to bar and QR codes
        width: 1,                       // width of barcode, applicable only to bar and QR codes
        displayValue: true,             // Display value below barcode
        fontsize: 8,
    }, {
        type: 'qrCode',
        value: 'https://github.com/Hubertformin/electron-pos-printer',
        height: 55,
        width: 55,
        style: 'margin: 10 20px 20 20px'
    }
];

const imprimir = PosPrinter.print(data, options)
    .then(() => { })
    .catch((error) => {
        console.error(error);
    });

function Print() {
    return (
    <View style={styles.container}>
        <Button onPress={imprimir}>imprimir</Button>
    </View>
    )

}

const styles= StyleSheet.create({
    container:{
    paddingVertical:15,
    flexDirection:'row'
    },
    text:{
        fontWeight:'bold',
        fontSize:20,
        flex: 1,
    },
})

export default Print;
