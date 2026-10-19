'use strict';
const CONFIG = {
  negocio: {
    tipo: 'Clínica Veterinária',
    nome: 'Patas & Prosa',
    slogan: 'Cuidado de verdade para quem faz parte da família.',
    endereco: 'Rua das Acácias, 120 — Centro',
    funcionamento: 'Seg a sex, 8h às 18h · Sáb, 8h às 12h',
    instagram: '@patasprosa',
    registro: 'CRMV nº 00000 · Responsável técnica: Dra. Helena Albuquerque'
  },

  whatsapp: '5511999999999',

  animalPadrao: 'cachorro',     // abre neste animal se não houver URL nem localStorage
  chaveStorage: 'clinica_animal',
  antecedenciaMinutos: 30,      // não oferece horários de hoje que começam em menos de 30 min
  diasAgendaveis: 60,           // até quantos dias à frente aceita agendamento

  demo: {
    velocidade: 1,              // 1 = normal, 1.5 = mais rápido, 0.7 = mais lento
    animalFinal: 'gato',        // animal usado no preenchimento do formulário
    loop: false,                // true = repete sem parar (também: ?demo=1&loop=1)
    dados: { tutor: 'Mariana Souza', pet: 'Mel' }
  }
};

// ---------- 2. Equipe ----------
// dias: 0=domingo, 1=segunda ... 6=sábado | horarios: início de cada consulta
const EQUIPE = {
  helena: {
    nome: 'Dra. Helena Albuquerque', especialidade: 'Clínica geral e vacinação',
    emoji: '👩‍⚕️', cor: '#FFD9A8',
    dias: [1, 2, 3, 4, 5], horarios: ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00']
  },
  rafael: {
    nome: 'Dr. Rafael Menezes', especialidade: 'Ortopedia e cirurgia',
    emoji: '👨‍⚕️', cor: '#C9E4FF',
    dias: [2, 4, 6], horarios: ['08:00', '09:00', '10:00', '11:00']
  },
  joana: {
    nome: 'Dra. Joana Prado', especialidade: 'Dermatologia veterinária',
    emoji: '👩‍⚕️', cor: '#FFD0E0',
    dias: [2, 4], horarios: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00']
  },
  camila: {
    nome: 'Dra. Camila Torres', especialidade: 'Medicina felina',
    emoji: '👩‍⚕️', cor: '#DDD3FF',
    dias: [1, 3, 5], horarios: ['08:30', '09:30', '10:30', '14:30', '15:30', '16:30']
  },
  iuri: {
    nome: 'Dr. Iuri Sampaio', especialidade: 'Clínica de aves',
    emoji: '👨‍⚕️', cor: '#BDEFE6',
    dias: [2, 4, 6], horarios: ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00']
  },
  beatriz: {
    nome: 'Dra. Beatriz Nogueira', especialidade: 'Animais silvestres e exóticos',
    emoji: '👩‍⚕️', cor: '#D5EDB8',
    dias: [1, 2, 3, 4], horarios: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']
  },
  tiago: {
    nome: 'Dr. Tiago Lacerda', especialidade: 'Roedores e pequenos mamíferos',
    emoji: '👨‍⚕️', cor: '#FFD5C4',
    dias: [3, 5, 6], horarios: ['08:00', '09:00', '10:00', '11:00', '15:00', '16:00']
  }
};

// ---------- 3. Espécies ----------
// paleta: cores da página inteira quando o animal está selecionado
// precos: grupos → itens { nome, preco, aPartirDe?, obs? }  (preco 0 = "Grátis")
const ANIMAIS = {
  cachorro: {
    nome: 'Cachorro', plural: 'cachorros', emoji: '🐶', exemploPet: 'Thor',
    paleta: {
      bg: '#FFF3DF', superficie: '#FFFBF3', tinta: '#2B1A0B', tintaSuave: '#6B4A2E',
      primaria: '#B85A0C', destaque: '#F2A33A', suave: '#FFDFAE', borda: '#EBCB9B'
    },
    hero: {
      titulo: 'Rabo abanando começa com', destaque: 'saúde em dia.',
      texto: 'Consultas, vacinas, exames e banho e tosa para o seu cachorro, com veterinários que tratam cada pet pelo nome.',
      pet: '🐕', orbitas: ['🦴', '🎾', '💛'],
      chips: ['Vacinas em dia', 'Banho e tosa', 'Atendimento com hora marcada']
    },
    profissionais: ['helena', 'rafael', 'joana'],
    precos: [
      { grupo: 'Consultas', itens: [
        { nome: 'Consulta clínica geral', preco: 120 },
        { nome: 'Retorno', preco: 0, obs: 'Até 15 dias após a consulta' },
        { nome: 'Consulta dermatológica', preco: 180 },
        { nome: 'Consulta ortopédica', preco: 200 }
      ] },
      { grupo: 'Vacinas', itens: [
        { nome: 'Vacina V10 (múltipla)', preco: 95 },
        { nome: 'Vacina antirrábica', preco: 70 },
        { nome: 'Vacina contra gripe canina', preco: 85 },
        { nome: 'Vacina contra giárdia', preco: 90 }
      ] },
      { grupo: 'Exames', itens: [
        { nome: 'Hemograma completo', preco: 75 },
        { nome: 'Bioquímico (ureia e creatinina)', preco: 90 },
        { nome: 'Raio-X', preco: 130, obs: 'Por incidência' },
        { nome: 'Ultrassom abdominal', preco: 220 }
      ] },
      { grupo: 'Banho e tosa', itens: [
        { nome: 'Banho — porte pequeno', preco: 55 },
        { nome: 'Banho — porte médio', preco: 70 },
        { nome: 'Banho — porte grande', preco: 95 },
        { nome: 'Tosa higiênica', preco: 40 }
      ] }
    ],
    dicas: [
      { icone: '💉', titulo: 'Vacinas e vermífugo no prazo', texto: 'Filhotes precisam de várias doses de vacina e adultos de reforço anual. Peça o calendário completo na consulta.' },
      { icone: '☀️', titulo: 'Cuidado com o chão quente', texto: 'Se a palma da sua mão não aguenta 5 segundos no asfalto, a pata do cachorro também não. Prefira passeios cedo ou à noite.' },
      { icone: '🍫', titulo: 'Alimentos proibidos', texto: 'Chocolate, uva, cebola, alho e adoçantes com xilitol fazem mal. Em caso de ingestão, procure atendimento na hora.' },
      { icone: '🦷', titulo: 'Dentes também precisam de rotina', texto: 'Escovar algumas vezes por semana, com pasta própria para cães, ajuda a evitar tártaro e mau hálito.' }
    ]
  },

  gato: {
    nome: 'Gato', plural: 'gatos', emoji: '🐱', exemploPet: 'Mel',
    paleta: {
      bg: '#EFEBFC', superficie: '#FAF8FF', tinta: '#1E1A45', tintaSuave: '#50498A',
      primaria: '#5B4BC4', destaque: '#F08FB4', suave: '#D8D0F8', borda: '#C5BAF0'
    },
    hero: {
      titulo: 'Ronronar tranquilo é sinal de', destaque: 'gato bem cuidado.',
      texto: 'Medicina felina sem estresse: ambiente calmo, manejo gentil e profissionais que entendem o jeito de cada gatinho.',
      pet: '🐈', orbitas: ['🐟', '🧶', '💜'],
      chips: ['Manejo sem estresse', 'Vacinas V4 e V5', 'Especialista em felinos']
    },
    profissionais: ['camila', 'helena', 'joana'],
    precos: [
      { grupo: 'Consultas', itens: [
        { nome: 'Consulta clínica felina', preco: 130 },
        { nome: 'Retorno', preco: 0, obs: 'Até 15 dias após a consulta' },
        { nome: 'Consulta dermatológica', preco: 180 },
        { nome: 'Consulta comportamental', preco: 170 }
      ] },
      { grupo: 'Vacinas', itens: [
        { nome: 'Vacina V4 (quádrupla felina)', preco: 110 },
        { nome: 'Vacina V5', preco: 120 },
        { nome: 'Vacina antirrábica', preco: 70 }
      ] },
      { grupo: 'Exames', itens: [
        { nome: 'Hemograma completo', preco: 75 },
        { nome: 'Teste rápido FIV/FeLV', preco: 160 },
        { nome: 'Raio-X', preco: 130, obs: 'Por incidência' },
        { nome: 'Ultrassom abdominal', preco: 220 }
      ] },
      { grupo: 'Banho e cuidados', itens: [
        { nome: 'Banho — pelo curto', preco: 70 },
        { nome: 'Banho — pelo longo', preco: 95 },
        { nome: 'Corte de unhas', preco: 25 }
      ] }
    ],
    dicas: [
      { icone: '🪟', titulo: 'Telas de proteção nas janelas', texto: 'Gatos calculam mal as quedas. Redes de proteção em janelas e varandas evitam acidentes graves.' },
      { icone: '💧', titulo: 'Água fresca e em movimento', texto: 'Muitos gatos bebem pouco. Fontinhas e vários potes pela casa ajudam a manter os rins saudáveis.' },
      { icone: '🚽', titulo: 'Uma caixa de areia a mais que o número de gatos', texto: 'Mantenha em local calmo e limpe todo dia. Mudança no xixi ou no hábito pode ser sinal de problema.' },
      { icone: '🙈', titulo: 'Esconder-se e não comer merecem atenção', texto: 'Gatos disfarçam dor. Se seu gato ficar mais de 24 horas sem comer ou muito isolado, procure o veterinário.' }
    ]
  },

  aves: {
    nome: 'Aves', plural: 'aves', emoji: '🦜', exemploPet: 'Pipoca',
    paleta: {
      bg: '#E2F5F2', superficie: '#F6FDFC', tinta: '#0A2E2B', tintaSuave: '#2F6661',
      primaria: '#0B7A72', destaque: '#F2B418', suave: '#B9E7E0', borda: '#9CD5CC'
    },
    hero: {
      titulo: 'Canto bonito vem de', destaque: 'asas saudáveis.',
      texto: 'Atendimento especializado para calopsitas, periquitos, papagaios e outras aves, do check-up ao corte de unhas e bico.',
      pet: '🦜', orbitas: ['🌿', '🪶', '☀️'],
      chips: ['Veterinário de aves', 'Sexagem por DNA', 'Check-up de filhote']
    },
    profissionais: ['iuri', 'beatriz'],
    precos: [
      { grupo: 'Consultas', itens: [
        { nome: 'Consulta ornitológica', preco: 160 },
        { nome: 'Retorno', preco: 0, obs: 'Até 15 dias após a consulta' },
        { nome: 'Check-up de filhote', preco: 140 }
      ] },
      { grupo: 'Exames', itens: [
        { nome: 'Exame de fezes (parasitológico)', preco: 60 },
        { nome: 'Sexagem por DNA', preco: 120 },
        { nome: 'Hemograma', preco: 85 },
        { nome: 'Raio-X', preco: 140 }
      ] },
      { grupo: 'Cuidados', itens: [
        { nome: 'Corte de unhas e bico', preco: 35 },
        { nome: 'Corte de penas das asas', preco: 45 }
      ] }
    ],
    dicas: [
      { icone: '🍳', titulo: 'Fumaça de panela antiaderente é perigosa', texto: 'O gás liberado por frigideiras superaquecidas pode matar aves. Deixe a gaiola longe da cozinha.' },
      { icone: '🥦', titulo: 'Semente não é refeição completa', texto: 'Dieta só de sementes causa deficiências. Ração própria, verduras e frutas ajudam; evite abacate.' },
      { icone: '🌤️', titulo: 'Sol da manhã e ar sem corrente', texto: 'Ofereça sol suave e proteja do vento forte e de mudanças bruscas de temperatura.' },
      { icone: '🚨', titulo: 'Penas eriçadas e pouca atividade', texto: 'Ave quietinha, no fundo da gaiola e de penas eriçadas pode estar muito doente. Procure atendimento rápido.' }
    ]
  },

  roedores: {
    nome: 'Roedores', plural: 'roedores', emoji: '🐹', exemploPet: 'Bolinha',
    paleta: {
      bg: '#FFECE5', superficie: '#FFF8F5', tinta: '#3A1521', tintaSuave: '#7A3F52',
      primaria: '#B53F5E', destaque: '#8DB36A', suave: '#FFD0C2', borda: '#F2B3A2'
    },
    hero: {
      titulo: 'Pequenos no tamanho, grandes em', destaque: 'cuidado.',
      texto: 'Hamsters, porquinhos-da-índia, chinchilas e companhia: consulta com quem entende de dentes, dieta e manejo de roedores.',
      pet: '🐹', orbitas: ['🌻', '🥕', '🌰'],
      chips: ['Hamster, porquinho e chinchila', 'Avaliação de dentes', 'Orientação de dieta']
    },
    profissionais: ['tiago', 'beatriz'],
    precos: [
      { grupo: 'Consultas', itens: [
        { nome: 'Consulta de roedores', preco: 140 },
        { nome: 'Retorno', preco: 0, obs: 'Até 15 dias após a consulta' },
        { nome: 'Primeira consulta (orientação de manejo)', preco: 150 }
      ] },
      { grupo: 'Prevenção', itens: [
        { nome: 'Vermifugação', preco: 40 }
      ] },
      { grupo: 'Exames', itens: [
        { nome: 'Exame de fezes', preco: 60 },
        { nome: 'Raio-X', preco: 140 },
        { nome: 'Ultrassom', preco: 200 }
      ] },
      { grupo: 'Cuidados', itens: [
        { nome: 'Corte de unhas e desgaste de dentes', preco: 40 }
      ] }
    ],
    dicas: [
      { icone: '🦷', titulo: 'Os dentes nunca param de crescer', texto: 'Feno, gravetos e brinquedos de roer ajudam no desgaste. Dente comprido demais atrapalha a alimentação.' },
      { icone: '🍊', titulo: 'Porquinho-da-índia precisa de vitamina C', texto: 'Eles não produzem a vitamina sozinhos. Verduras ricas em vitamina C e ração própria fazem diferença.' },
      { icone: '🪵', titulo: 'Atenção ao material da forração', texto: 'Evite maravalha de cedro e pinus, que liberam substâncias irritantes. Pergunte sobre opções mais seguras.' },
      { icone: '🌡️', titulo: 'Calor demais é perigoso', texto: 'Roedores sofrem com temperatura alta. Mantenha o ambiente fresco, ventilado e fora do sol direto.' }
    ]
  },

  exoticos: {
    nome: 'Exóticos', plural: 'animais exóticos', emoji: '🦎', exemploPet: 'Rex',
    paleta: {
      bg: '#E5EFD9', superficie: '#F7FBF1', tinta: '#13260C', tintaSuave: '#3F5F31',
      primaria: '#3F7D2C', destaque: '#E4572E', suave: '#C7DFB0', borda: '#AACB90'
    },
    hero: {
      titulo: 'Cada espécie é um mundo, e a gente', destaque: 'conhece o seu.',
      texto: 'Répteis, coelhos, furões e outros pets não convencionais: avaliação de ambiente, manejo e consulta com especialistas.',
      pet: '🦎', orbitas: ['🍃', '☀️', '🥬'],
      chips: ['Répteis, coelhos e furões', 'Avaliação de terrário', 'Orientação de manejo']
    },
    profissionais: ['beatriz', 'iuri', 'tiago'],
    precos: [
      { grupo: 'Consultas', itens: [
        { nome: 'Consulta de exóticos', preco: 190 },
        { nome: 'Retorno', preco: 0, obs: 'Até 15 dias após a consulta' },
        { nome: 'Primeira consulta (orientação de manejo)', preco: 210 }
      ] },
      { grupo: 'Exames', itens: [
        { nome: 'Exame de fezes', preco: 65 },
        { nome: 'Hemograma', preco: 95 },
        { nome: 'Raio-X', preco: 150 }
      ] },
      { grupo: 'Cuidados', itens: [
        { nome: 'Corte de unhas e bico', preco: 45 },
        { nome: 'Avaliação de terrário ou viveiro', preco: 120 }
      ] }
    ],
    dicas: [
      { icone: '🌡️', titulo: 'Temperatura e luz certas', texto: 'Répteis dependem de calor e luz UVB adequados. Termômetro no ambiente e lâmpada dentro da validade fazem diferença.' },
      { icone: '🐰', titulo: 'Coelho precisa de feno à vontade', texto: 'O feno é a base da dieta e protege os dentes e o intestino. Ração e frutas entram em pequenas quantidades.' },
      { icone: '📜', titulo: 'Compre de criadouro legalizado', texto: 'Exija documentação de origem. Isso protege você, o animal e a fauna nativa.' },
      { icone: '🧼', titulo: 'Higiene depois de manusear', texto: 'Lave as mãos após mexer no animal ou no ambiente dele. Alguns répteis carregam bactérias como a salmonela.' }
    ]
  }
};

/* =====================================================================
   A PARTIR DAQUI É A LÓGICA DA PÁGINA (normalmente não precisa mexer, mas abre o olho)
   ===================================================================== */

// ---------- Utilidades ----------
const $ = (seletor, raiz = document) => raiz.querySelector(seletor);
const $$ = (seletor, raiz = document) => Array.from(raiz.querySelectorAll(seletor));
const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const reduzMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const moeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
const NOMES_DIAS = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];

const paraISO = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const deISO = (iso) => { const [a, m, d] = iso.split('-').map(Number); return new Date(a, m - 1, d); };
const primeiroNome = (nome) => nome.split(' ').slice(0, 2).join(' '); // "Dra. Helena"

function textoDias(dias) {
  const ord = [...dias].sort((a, b) => a - b);
  const seguidos = ord.every((d, i) => i === 0 || d === ord[i - 1] + 1);
  if (ord.length >= 3 && seguidos) return `${NOMES_DIAS[ord[0]]} a ${NOMES_DIAS[ord[ord.length - 1]]}`;
  const nomes = ord.map((d) => NOMES_DIAS[d]);
  return nomes.length > 1 ? `${nomes.slice(0, -1).join(', ')} e ${nomes[nomes.length - 1]}` : nomes[0];
}
function textoHorario(v) {
  const h = (s) => Number(s.split(':')[0]);
  const ini = v.horarios[0];
  const ultimo = v.horarios[v.horarios.length - 1];
  const fmt = (s) => (s.endsWith(':00') ? `${h(s)}h` : s.replace(':', 'h'));
  const fim = `${h(ultimo) + 1}h`;
  return `${textoDias(v.dias)} · ${fmt(ini)} às ${fim}`;
}

// ---------- Estado ----------
let animalAtual = null;
let timerTroca = null;
let demoAtivo = false;

// ---------- Disponibilidade (simulada) ----------
// TODO: integrar API — buscar horários realmente ocupados no sistema da clínica.
function ocupado(vetId, iso, hora) {
  let h = 7;
  const s = vetId + iso + hora;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h % 4 === 0; // ~25% dos horários aparecem ocupados
}
function horariosLivres(vetId, iso) {
  const v = EQUIPE[vetId];
  if (!v || !iso) return [];
  const data = deISO(iso);
  if (!v.dias.includes(data.getDay())) return [];
  const agora = new Date();
  const hoje = iso === paraISO(agora);
  const limite = agora.getHours() * 60 + agora.getMinutes() + CONFIG.antecedenciaMinutos;
  return v.horarios.filter((h) => {
    if (ocupado(vetId, iso, h)) return false;
    if (hoje) { const [hh, mm] = h.split(':').map(Number); if (hh * 60 + mm < limite) return false; }
    return true;
  });
}

// ---------- Paleta ----------
function aplicarPaleta(p) {
  const r = document.documentElement.style;
  r.setProperty('--bg', p.bg);
  r.setProperty('--superficie', p.superficie);
  r.setProperty('--tinta', p.tinta);
  r.setProperty('--tinta-suave', p.tintaSuave);
  r.setProperty('--primaria', p.primaria);
  r.setProperty('--destaque', p.destaque);
  r.setProperty('--suave', p.suave);
  r.setProperty('--borda', p.borda);
  const meta = $('#meta-tema');
  if (meta) meta.setAttribute('content', p.primaria);
}

// ---------- Seletor de animal ----------
function montarSeletor() {
  const caixa = $('#seletor');
  caixa.innerHTML = Object.entries(ANIMAIS).map(([id, a]) => `
    <button type="button" role="radio" aria-checked="false" tabindex="-1" data-animal="${id}" aria-label="${esc(a.nome)}">
      <span class="seletor__icone" aria-hidden="true">${a.emoji}</span>
      <span class="seletor__rotulo">${esc(a.nome)}</span>
    </button>`).join('');

  caixa.addEventListener('click', (e) => {
    const b = e.target.closest('button[data-animal]');
    if (b) selecionarAnimal(b.dataset.animal);
  });

  // Navegação por setas (padrão de radiogroup)
  caixa.addEventListener('keydown', (e) => {
    const ids = Object.keys(ANIMAIS);
    let i = ids.indexOf(animalAtual);
    if (['ArrowRight', 'ArrowDown'].includes(e.key)) i = (i + 1) % ids.length;
    else if (['ArrowLeft', 'ArrowUp'].includes(e.key)) i = (i - 1 + ids.length) % ids.length;
    else if (e.key === 'Home') i = 0;
    else if (e.key === 'End') i = ids.length - 1;
    else return;
    e.preventDefault();
    selecionarAnimal(ids[i]);
    $(`button[data-animal="${ids[i]}"]`, caixa).focus();
  });
}

function marcarSeletor(id) {
  $$('#seletor button').forEach((b) => {
    const ativo = b.dataset.animal === id;
    b.setAttribute('aria-checked', ativo);
    b.tabIndex = ativo ? 0 : -1;
  });
}

// ---------- Renderização por seção ----------
function renderHero(a) {
  $('#hero-eyebrow').textContent = `Para o seu ${a.nome.toLowerCase() === 'aves' ? 'pássaro' : a.nome.toLowerCase() === 'exóticos' ? 'pet exótico' : a.nome.toLowerCase() === 'roedores' ? 'roedor' : a.nome.toLowerCase()}`;
  $('#hero-titulo').innerHTML = `${esc(a.hero.titulo)} <em>${esc(a.hero.destaque)}</em>`;
  $('#hero-sub').textContent = a.hero.texto;
  $('#hero-chips').innerHTML = a.hero.chips.map((c, i) => `<li class="anim" style="--i:${i}">${esc(c)}</li>`).join('');
  $('#hero-pet').textContent = a.hero.pet;
  a.hero.orbitas.forEach((o, i) => { $(`#orbita-${i + 1}`).textContent = o; });
}

function renderProfissionais(a) {
  $('#prof-titulo').textContent = `Quem cuida de ${a.plural}`;
  $('#prof-sub').textContent = `Veterinários que atendem ${a.plural} na clínica, com os dias e horários de cada um.`;
  $('#lista-profissionais').innerHTML = a.profissionais.map((id, i) => {
    const v = EQUIPE[id];
    return `
      <article class="card vet anim" style="--i:${i}">
        <div class="vet__topo">
          <div class="vet__foto" style="background:${v.cor}" role="img" aria-label="Ilustração de ${esc(v.nome)}">${v.emoji}</div>
          <div>
            <h3 class="vet__nome">${esc(v.nome)}</h3>
            <p class="vet__esp">${esc(v.especialidade)}</p>
          </div>
        </div>
        <p class="vet__horario"><span aria-hidden="true">🕒</span> ${esc(textoHorario(v))}</p>
        <button class="botao botao--p botao--bloco" type="button" data-agendar-com="${id}">Agendar com ${esc(primeiroNome(v.nome))}</button>
      </article>`;
  }).join('');
}

function renderPrecos(a) {
  $('#preco-titulo').textContent = `Valores para ${a.plural}`;
  const corpo = a.precos.map((g) => `
    <tbody>
      <tr class="grupo"><th colspan="3" scope="colgroup">${esc(g.grupo)}</th></tr>
      ${g.itens.map((it) => `
        <tr>
          <th scope="row" class="serv">${esc(it.nome)}${it.obs ? `<small>${esc(it.obs)}</small>` : ''}</th>
          <td class="valor">${it.preco === 0 ? 'Grátis' : `${it.aPartirDe ? '<span class="ap">a partir de</span>' : ''}${moeda.format(it.preco)}`}</td>
          <td class="acao"><button class="mini" type="button" data-agendar-servico="${esc(it.nome)}" aria-label="Agendar: ${esc(it.nome)}"><span aria-hidden="true">📅</span></button></td>
        </tr>`).join('')}
    </tbody>`).join('');
  $('#tabela-precos').innerHTML = `
    <table class="tabela">
      <caption class="sr-only">Tabela de valores para ${esc(a.plural)}</caption>
      <thead class="sr-only"><tr><th>Serviço</th><th>Valor</th><th>Agendar</th></tr></thead>
      ${corpo}
    </table>`;
}

function renderDicas(a) {
  $('#dicas-titulo').textContent = `Dicas rápidas para ${a.plural}`;
  $('#lista-dicas').innerHTML = a.dicas.map((d, i) => `
    <article class="card dica anim" style="--i:${i}">
      <div class="dica__icone" aria-hidden="true">${d.icone}</div>
      <h3>${esc(d.titulo)}</h3>
      <p>${esc(d.texto)}</p>
    </article>`).join('');
}

// ---------- Formulário ----------
function atualizarFormulario(a) {
  $('#animal-escolhido').innerHTML = `<b aria-hidden="true">${a.emoji}</b> Agendando para: ${esc(a.nome)}`;
  $('#f-pet').placeholder = `Ex.: ${a.exemploPet}`;

  const sServ = $('#f-servico');
  sServ.innerHTML = '<option value="">Selecione o serviço</option>' +
    a.precos.map((g) => `<optgroup label="${esc(g.grupo)}">${g.itens.map((it) => `<option value="${esc(it.nome)}">${esc(it.nome)}</option>`).join('')}</optgroup>`).join('');

  const sProf = $('#f-prof');
  sProf.innerHTML = '<option value="">Selecione o profissional</option>' +
    a.profissionais.map((id) => `<option value="${id}">${esc(EQUIPE[id].nome)} — ${esc(EQUIPE[id].especialidade)}</option>`).join('');

  atualizarHorarios();
  limparErros();
  $('#previa').hidden = true;
}

function atualizarHorarios() {
  const idProf = $('#f-prof').value;
  const data = $('#f-data').value;
  const sel = $('#f-hora');
  const dica = $('#hora-dica');
  const anterior = sel.value;
  const v = EQUIPE[idProf];
  sel.innerHTML = '';
  dica.textContent = '';

  if (!v || !data) {
    sel.disabled = true;
    sel.add(new Option('Escolha profissional e data', ''));
    return;
  }
  const livres = horariosLivres(idProf, data);
  if (!livres.length) {
    sel.disabled = true;
    sel.add(new Option('Sem horários neste dia', ''));
    const atende = v.dias.includes(deISO(data).getDay());
    dica.textContent = atende
      ? 'Os horários deste dia já estão preenchidos. Tente outra data.'
      : `${primeiroNome(v.nome)} atende ${textoDias(v.dias)}. Escolha outra data.`;
    return;
  }
  sel.disabled = false;
  sel.add(new Option('Selecione o horário', ''));
  livres.forEach((h) => sel.add(new Option(h, h)));
  if (livres.includes(anterior)) sel.value = anterior;
}

function configurarData() {
  const campo = $('#f-data');
  const hoje = new Date();
  const max = new Date(); max.setDate(max.getDate() + CONFIG.diasAgendaveis);
  campo.min = paraISO(hoje);
  campo.max = paraISO(max);
}

function limparErros() {
  $$('.erro').forEach((e) => { e.textContent = ''; });
  $$('#form-agendamento [aria-invalid]').forEach((el) => el.removeAttribute('aria-invalid'));
}

function validar() {
  const regras = [
    ['tutor', 'Informe o nome do tutor.'],
    ['pet', 'Informe o nome do pet.'],
    ['servico', 'Escolha um serviço.'],
    ['prof', 'Escolha um profissional.'],
    ['data', 'Escolha uma data.'],
    ['hora', 'Escolha um horário.']
  ];
  let primeiro = null;
  regras.forEach(([k, msg]) => {
    const el = $('#f-' + k);
    const vazio = el.value.trim() === '' || el.disabled;
    const erro = $('#e-' + k);
    erro.textContent = vazio ? msg : '';
    if (vazio) { el.setAttribute('aria-invalid', 'true'); primeiro = primeiro || el; }
    else el.removeAttribute('aria-invalid');
  });
  if (primeiro) primeiro.focus();
  return !primeiro;
}

function montarMensagem() {
  const a = ANIMAIS[animalAtual];
  const v = EQUIPE[$('#f-prof').value];
  const data = new Intl.DateTimeFormat('pt-BR', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' })
    .format(deISO($('#f-data').value));
  return [
    `Olá, ${CONFIG.negocio.nome}! Gostaria de agendar um atendimento.`,
    '',
    `🐾 Animal: ${a.nome}`,
    `🐶 Pet: ${$('#f-pet').value.trim()}`,
    `👤 Tutor: ${$('#f-tutor').value.trim()}`,
    `🩺 Serviço: ${$('#f-servico').value}`,
    `👩‍⚕️ Profissional: ${v.nome}`,
    `📅 Data: ${data}`,
    `⏰ Horário: ${$('#f-hora').value}`
  ].join('\n');
}

function enviarAgendamento(e) {
  e.preventDefault();
  if (!validar()) return;
  const msg = montarMensagem();
  // TODO: integrar API — registrar o agendamento no sistema da clínica antes de abrir o WhatsApp.
  const url = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
  $('#previa-texto').textContent = msg;
  $('#previa-link').href = url;
  $('#previa').hidden = false;
  $('#previa').scrollIntoView({ behavior: reduzMovimento ? 'auto' : 'smooth', block: 'nearest' });
  if (!demoAtivo) window.open(url, '_blank', 'noopener');
}

function limparFormulario() {
  $('#form-agendamento').reset();
  if (animalAtual) atualizarFormulario(ANIMAIS[animalAtual]);
}

// ---------- Troca de animal ----------
function renderTudo(id) {
  const a = ANIMAIS[id];
  renderHero(a);
  renderProfissionais(a);
  renderPrecos(a);
  renderDicas(a);
  atualizarFormulario(a);
}

function selecionarAnimal(id, opcoes = {}) {
  const { persistir = true, semTransicao = false } = opcoes;
  if (!ANIMAIS[id]) id = CONFIG.animalPadrao;
  if (id === animalAtual && !semTransicao) return;

  animalAtual = id;
  const a = ANIMAIS[id];
  marcarSeletor(id);
  aplicarPaleta(a.paleta);
  document.title = `${CONFIG.negocio.nome} — ${CONFIG.negocio.tipo} para ${a.plural}`;
  $('#anuncio').textContent = `Mostrando conteúdo para: ${a.nome}`;

  if (persistir) {
    // localStorage (pode falhar em navegação privada) + URL (?animal=gato)
    try { localStorage.setItem(CONFIG.chaveStorage, id); } catch (e) { /* ignora */ }
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('animal', id);
      history.replaceState(null, '', url);
    } catch (e) { /* ex.: abrindo via file:// em alguns navegadores */ }
  }

  const blocos = $$('.dinamico');
  clearTimeout(timerTroca);
  if (semTransicao || reduzMovimento) {
    renderTudo(id);
    return;
  }
  blocos.forEach((b) => b.classList.add('trocando'));
  timerTroca = setTimeout(() => {
    renderTudo(id);
    requestAnimationFrame(() => blocos.forEach((b) => b.classList.remove('trocando')));
  }, 240);
}

function animalInicial() {
  const daUrl = new URLSearchParams(window.location.search).get('animal');
  if (daUrl && ANIMAIS[daUrl]) return daUrl;
  try {
    const salvo = localStorage.getItem(CONFIG.chaveStorage);
    if (salvo && ANIMAIS[salvo]) return salvo;
  } catch (e) { /* ignora */ }
  return CONFIG.animalPadrao;
}

// ---------- Textos fixos do negócio ----------
function preencherNegocio() {
  const n = CONFIG.negocio;
  $('#marca-nome').textContent = n.nome;
  $('#marca-tipo').textContent = n.tipo;
  $('#rodape-nome').textContent = `${n.tipo} ${n.nome}`;
  $('#rodape-slogan').textContent = n.slogan;
  $('#rodape-endereco').textContent = `📍 ${n.endereco}`;
  $('#rodape-horario').textContent = `🕒 ${n.funcionamento}`;
  $('#rodape-insta').textContent = `📷 ${n.instagram}`;
  $('#rodape-registro').textContent = n.registro;
  $('#rodape-copy').textContent = `© ${new Date().getFullYear()} ${n.nome}. Todos os direitos reservados.`;
  $('#info-funcionamento').textContent = `Funcionamento: ${n.funcionamento}`;
}

function ajustarAlturaHeader() {
  const h = $('#topo').offsetHeight;
  document.documentElement.style.setProperty('--alt-header', `${h + 12}px`);
}

// ---------- Atalhos "Agendar com..." / "Agendar serviço" ----------
function irPara(id) {
  const el = typeof id === 'string' ? $(id) : id;
  if (el) el.scrollIntoView({ behavior: reduzMovimento ? 'auto' : 'smooth', block: 'start' });
}

function ligarAtalhos() {
  document.addEventListener('click', (e) => {
    const comVet = e.target.closest('[data-agendar-com]');
    const comServ = e.target.closest('[data-agendar-servico]');
    if (comVet) {
      $('#f-prof').value = comVet.dataset.agendarCom;
      atualizarHorarios();
      irPara('#agendar');
      setTimeout(() => $('#f-servico').focus({ preventScroll: true }), reduzMovimento ? 0 : 500);
    } else if (comServ) {
      $('#f-servico').value = comServ.dataset.agendarServico;
      irPara('#agendar');
      setTimeout(() => $('#f-prof').focus({ preventScroll: true }), reduzMovimento ? 0 : 500);
    }
  });
}

let focoDemo = null;

const esperar = (ms) => new Promise((r) => setTimeout(r, ms / CONFIG.demo.velocidade));
async function passo(ms) {
  await esperar(ms);
  if (!demoAtivo) throw new Error('demo-cancelada');
}

function legenda(texto, alvo) {
  $('#demo-texto').textContent = texto;
  $('#demo-legenda').hidden = false;
  if (focoDemo) focoDemo.classList.remove('demo-foco');
  focoDemo = alvo || null;
  if (focoDemo) focoDemo.classList.add('demo-foco');
}

function pararDemo() {
  demoAtivo = false;
  document.body.classList.remove('modo-demo');
  $('#demo-legenda').hidden = true;
  if (focoDemo) { focoDemo.classList.remove('demo-foco'); focoDemo = null; }
}

async function digitar(el, texto) {
  el.focus({ preventScroll: true });
  el.value = '';
  for (const letra of texto) {
    el.value += letra;
    el.dispatchEvent(new Event('input', { bubbles: true }));
    await passo(70);
  }
}

function proximaDataDisponivel(idProf) {
  const base = new Date();
  for (let i = 1; i <= 30; i++) {
    const d = new Date(base); d.setDate(base.getDate() + i);
    const iso = paraISO(d);
    if (horariosLivres(idProf, iso).length) return iso;
  }
  return null;
}

async function rodarDemo() {
  if (demoAtivo) return;
  demoAtivo = true;
  document.body.classList.add('modo-demo');
  const params = new URLSearchParams(window.location.search);
  const repetir = CONFIG.demo.loop || params.get('loop') === '1';

  try {
    do {
      limparFormulario();
      irPara('#inicio');

      // 1) Seletor: percorre todos os animais
      legenda('Escolha o animal e o site inteiro se transforma ✨', $('#seletor'));
      await passo(1600);
      for (const id of Object.keys(ANIMAIS)) {
        selecionarAnimal(id, { persistir: false });
        await passo(1900);
      }
      selecionarAnimal(CONFIG.demo.animalFinal);
      await passo(1400);

      // 2) Profissionais, preços e dicas
      legenda('Só aparecem os profissionais que atendem a espécie', $('#lista-profissionais'));
      irPara('#profissionais');
      await passo(2800);
      legenda('Tabela de preços específica para cada animal', $('#tabela-precos'));
      irPara('#precos');
      await passo(2800);
      legenda('Dicas de cuidado feitas para a espécie', $('#lista-dicas'));
      irPara('#dicas');
      await passo(2800);

      // 3) Agendamento
      legenda('Agendamento já filtrado pelo animal escolhido', $('#form-agendamento'));
      irPara('#agendar');
      await passo(1800);

      await digitar($('#f-tutor'), CONFIG.demo.dados.tutor);
      await passo(300);
      await digitar($('#f-pet'), CONFIG.demo.dados.pet);
      await passo(500);

      const sServ = $('#f-servico');
      sServ.selectedIndex = 1; // primeiro serviço (consulta)
      await passo(700);

      const sProf = $('#f-prof');
      sProf.selectedIndex = 1;
      sProf.dispatchEvent(new Event('change', { bubbles: true }));
      await passo(700);

      const iso = proximaDataDisponivel(sProf.value);
      if (iso) {
        legenda('Só mostra os horários livres do profissional', $('#f-hora'));
        $('#f-data').value = iso;
        $('#f-data').dispatchEvent(new Event('change', { bubbles: true }));
        await passo(1400);
        if ($('#f-hora').options.length > 1) $('#f-hora').selectedIndex = 1;
        await passo(900);
      }

      legenda('Um toque e a mensagem vai pronta para o WhatsApp 💬', $('#btn-agendar'));
      await passo(1400);
      $('#btn-agendar').click();
      await passo(4200);
    } while (repetir);
  } catch (e) {
    if (e.message !== 'demo-cancelada') console.error(e);
  } finally {
    pararDemo();
  }
}

// ---------- Inicialização ----------
function iniciar() {
  preencherNegocio();
  montarSeletor();
  configurarData();
  ligarAtalhos();

  $('#form-agendamento').addEventListener('submit', enviarAgendamento);
  $('#f-prof').addEventListener('change', atualizarHorarios);
  $('#f-data').addEventListener('change', atualizarHorarios);
  // Some a mensagem de erro assim que o usuário corrige o campo
  $('#form-agendamento').addEventListener('input', (e) => {
    const el = e.target;
    if (el.id && el.id.startsWith('f-')) {
      const erro = $('#e-' + el.id.slice(2));
      if (erro) erro.textContent = '';
      el.removeAttribute('aria-invalid');
    }
  });

  $('#btn-demo').addEventListener('click', rodarDemo);
  $('#demo-parar').addEventListener('click', pararDemo);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && demoAtivo) pararDemo(); });

  window.addEventListener('resize', ajustarAlturaHeader);
  ajustarAlturaHeader();

  selecionarAnimal(animalInicial(), { semTransicao: true });

  if (new URLSearchParams(window.location.search).get('demo') === '1') {
    setTimeout(rodarDemo, 900);
  }
}

document.addEventListener('DOMContentLoaded', iniciar);
