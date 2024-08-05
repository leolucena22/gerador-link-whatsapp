// Certifique-se de que o script seja executado apenas após o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function () {
  
  // Máscara de input de telefone
  const handlePhone = event => {
    let input = event.target;
    input.value = phoneMask(input.value);
  };

  const phoneMask = value => {
    if (!value) return '';
    value = value.replace(/\D/g, '');
    value = value.replace(/^(\d{2})(\d)/, '+$1 $2');
    value = value.replace(/(\d{2})(\d)/, '($1) $2');
    value = value.replace(/(\d{4,5})(\d{4})$/, '$1-$2');
    return value;
  };

  // Gerar link do WhatsApp
  const linkInicial = 'https://wa.me/';

  function gerarLink() {
    let numero = document.querySelector('#numero').value;
    let mensagem = document.querySelector('#mensagem').value;

    // Remover caracteres especiais do número de telefone
    numero = numero.replace(/\D/g, '');

    // Verificar se o número tem o formato correto (por exemplo, 5511999999999)
    if (numero.length < 12) {
      alert(
        'Por favor, insira um número de telefone válido com o código do país e DDD'
      );
      return;
    }

    // Gerar o link do WhatsApp sem a mensagem
    let link = `${linkInicial}${numero}`;

    // Se a mensagem for preenchida, adicionar à URL
    if (mensagem.trim() !== '') {
      mensagem = encodeURIComponent(mensagem);
      link += `?text=${mensagem}`;
    }

    console.log(link);

    // Exibir o link no campo de texto
    const linkInput = document.querySelector('#link');
    if (linkInput) {
      linkInput.value = link;
      linkInput.disabled = false;
    }

    // Habilitar o botão de copiar
    const copiarLinkBtn = document.querySelector('#copiar-link');
    if (copiarLinkBtn) {
      copiarLinkBtn.disabled = false;
    }

    // Ocultar a box-gerador e exibir a box-resultado
    document.querySelector('.box-gerador').classList.add('hidden');
    document.querySelector('.box-resultado').classList.remove('hidden');
  }

  // Copiar link para a área de transferência
  function copiarLink() {
    const link = document.querySelector('#link').value;
    navigator.clipboard
      .writeText(link)
      .then(() => {
        alert('Link copiado para a área de transferência!');
      })
      .catch(err => {
        console.error('Erro ao copiar o link: ', err);
      });
  }

  // Função para gerar novamente
  function gerarNovamente() {
    document.querySelector('#numero').value = '';
    document.querySelector('#mensagem').value = '';
    const linkInput = document.querySelector('#link');
    if (linkInput) {
      linkInput.value = '';
      linkInput.disabled = true;
    }

    const copiarLinkBtn = document.querySelector('#copiar-link');
    if (copiarLinkBtn) {
      copiarLinkBtn.disabled = true;
    }

    // Exibir a box-gerador e ocultar a box-resultado
    document.querySelector('.box-gerador').classList.remove('hidden');
    document.querySelector('.box-resultado').classList.add('hidden');
  }

  // Adiciona os eventos aos botões
  document.querySelector('.botao-gerar').addEventListener('click', gerarLink);
  document.querySelector('#copiar-link').addEventListener('click', copiarLink);
  document.querySelector('.botao-gerar-novamente').addEventListener('click', gerarNovamente);

  // Adiciona a máscara ao campo de número
  document.querySelector('#numero').addEventListener('keyup', handlePhone);
});
