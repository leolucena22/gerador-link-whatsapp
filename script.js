// Máscara de input de telefone
const handlePhone = event => {
  let input = event.target
  input.value = phoneMask(input.value)
}

const phoneMask = value => {
  if (!value) return ''
  value = value.replace(/\D/g, '')
  value = value.replace(/^(\d{2})(\d)/, '+$1 $2')
  value = value.replace(/(\d{2})(\d)/, '($1) $2')
  value = value.replace(/(\d{4,5})(\d{4})$/, '$1-$2')
  return value
}

// Gerar link do WhatsApp
const linkInicial = 'https://wa.me/'

function gerarLink() {
  let numero = document.querySelector('#numero').value
  let mensagem = document.querySelector('#mensagem').value

  // Remover caracteres especiais do número de telefone
  numero = numero.replace(/\D/g, '')

  // Verificar se o número tem o formato correto (por exemplo, 5511999999999)
  if (numero.length < 12) {
    alert(
      'Por favor, insira um número de telefone válido com o código do país e DDD'
    )
    return
  }

  // Codificar a mensagem para URL
  mensagem = encodeURIComponent(mensagem)

  // Gerar o link do WhatsApp
  const link = `${linkInicial}${numero}?text=${mensagem}`
  console.log(link)

  // Exibir o link no campo de texto
  const linkInput = document.querySelector('#link')
  linkInput.value = link
  linkInput.disabled = false

  // Habilitar o botão de copiar
  document.querySelector('#copiar-link').disabled = false
}

// Copiar link para a área de transferência
function copiarLink() {
  const link = document.querySelector('#link').value
  navigator.clipboard
    .writeText(link)
    .then(() => {
      alert('Link copiado para a área de transferência!')
    })
    .catch(err => {
      console.error('Erro ao copiar o link: ', err)
    })
}
