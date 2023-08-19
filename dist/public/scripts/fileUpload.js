FilePond.registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginImageExifOrientation,
  FilePondPluginFileValidateSize,
  FilePondPluginImageEdit
)

// Select the file input and use
// create() to turn it into a pond
FilePond.create(document.querySelector('#thumb'), {
  labelIdle: `Arraste e solte sua imagem ou <span class="filepond--label-action">Navegue</span>`,
  server: '/snacks/thumb/upload',
  labelFileProcessing: 'Carregando',
  labelFileProcessingComplete: 'Imagem carregada',
  labelFileProcessingError: 'Ocorreu um erro ao carregar',
  labelTapToCancel: 'Clique para cancelar',
  labelTapToRetry: 'Clique para tentar novamente',
  labelTapToUndo: 'Clique para refazer',
})

document.addEventListener('FilePond:addfilestart', (e) => {
  const saveButton = document.querySelector('#save-button')
  saveButton.disabled = true
  console.log('Save button disabled')
})

document.addEventListener('FilePond:processfileprogress', (e) => {
  const saveButton = document.querySelector('#save-button')
  if (e.detail.progress === 1) {
    saveButton.disabled = false
    console.log('Save button enabled')
  }
})
