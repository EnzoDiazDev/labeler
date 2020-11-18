# Labeler
Labeler es una librería base para cualquier aplicación que requiera colocar etiquetas en github automáticamente. 

`npm i @lottielabs/labeler`

Contribuir: [CONTRIBUTING.md](https://github.com/lottielabs/lepp/blob/main/CONTRIBUTING.md)

## Empezar 

Labeler es una clase con algunos métodos. 

`constructor(options:labeler_options)`<br>
options: 
 * repo: string
 * token: string

Crea la instancia de Labeler.

```js
const labeler = new Labeler({
    repo: "owner/repo",
    token: "1a2b3c4d3e4f5g6h7i8j9k"
})
```

## Obtener etiquetas

`.get_label(label_name: string): Promise<label>`<br>
label_name: string <br>
*@returns*: label[*](#label)

Obtiene una label del repo a partir de su nombre.

```js
const label = await labeler.get_label("bug")
```

`.get_labels(labels_name: string[] | "*"): Promise<label[]>`<br>
labels_name: string[] o "*"<br>
*@returns*: label[][*](#label)

Obtiene varias labels del repo usando sus nombres, o todas las labels si se pasa un asterisco como nombre. 

```js
const labels = await labeler.get_labels(["bug", "mylabel"])
```

## Añadir etiquetas

`.add_label(label: label): Promise<void>` <br>
label: label[*](#label) <br>

Añade una label al repositorio. 

```js
await labeler.add_label({
    name: "custom_label",
    color: "ff0000",
    description: "Mi label roja"
})
```

`.add_labels(labels: label[]): Promise<void>`<br>
label: label[][*](#label)<br>

Añade muchas labels al repo.

```js
const labels = [
    {
        name: "label green",
        color: "00ff00",
        description: "mi label verde"
    },
    {
        name: "label green",
        color: "0000ff",
        description: "mi label azul"
    }
]

await labeler.add_labels(labels)
```

## Eliminar etiquetas

`.delete_label(label_name: string): Promise<void>`<br>
label_name: string<br>

Elimina una label del repo a partir de su nombre.

```js
await labeler.delete_label("label blue")
```

`.delete_labels(labels_name: string[] | "*"): Promise<void>`<br>
lables_name: string[] o "*" <br>

Elimina muchas labels según su nombre, o todas las labels si se pasa un asterisco como nombre.

```js
await labeler.delete_labels("*")
```

### label
```ts
type label = {
    name: string
    color: string
    description?: string
}
```

---

## Todo

- [ ] Documentar todo el código.
- [ ] Escribir el contributing como debe ser.
- [ ] Arreglar el manejo de errores horrible de la librería.
