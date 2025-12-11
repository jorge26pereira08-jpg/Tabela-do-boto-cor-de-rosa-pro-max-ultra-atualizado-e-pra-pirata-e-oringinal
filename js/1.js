const tabela = document.getElementById('tabela');
const painelInfo = document.querySelector('.painel.info');
const painelReacao = document.querySelector('.painel.reacao');
const painelHistorico = document.querySelector('.painel.historico');
const historicoLista = document.getElementById('historico-lista');
const btnLimparHistorico = document.getElementById('limparHistorico');
const btnToggleNeon = document.getElementById('toggleNeon');
const paineisContainer = document.getElementById('paineis');

/* ========================
 ESTADO
======================== */
let elementosSelecionados = [];

/* ========================
 DADOS ELEMENTOS
======================== */
const dadosElementos = {
    'H': {
        nome: 'Hidrogênio',
        num_atomico: 1,
        massa_atomica: '1.008 u',
        grupo: 'Não-Metal / Grupo 1',
        periodo: 1,
        descricao: 'Elemento mais abundante do universo.',
        categoria: 'ametal',
        posicao: {col: 1, row: 1},
        reage:'H+O H+N H+Cl H+C H+S H+F'
    },
    'He': {
        nome: 'Hélio',
        num_atomico: 2,
        massa_atomica: '4.0026 u',
        grupo: 'Gás Nobre / Grupo 18',
        periodo: 1,
        descricao: 'Usado para balões e em supercondutores.',
        categoria: 'gas-nobre',
        posicao: {col: 18, row: 1},
        reage:'Nao a reaçoes disponiveis'
    },
    'Li': {
        nome: 'Lítio',
        num_atomico: 3,
        massa_atomica: '6.94 u',
        grupo: 'Metal Alcalino / Grupo 1',
        periodo: 2,
        descricao: 'Essencial para baterias recarregáveis.',
        categoria: 'metal-alcalino',
        posicao: {col: 1, row: 2},
        reage:'Nao a reaçoes disponiveis'
    },
    'Be': {
        nome: 'Berilio',
        num_atomico: 4,
        massa_atomica: '9.01 u',
        grupo: 'Metal Alcalinoterrosos / Grupo 2',
        periodo: 2,
        descricao: 'É utilizado na industria aeroespacial',
        categoria: 'metal-alcalino-terra',
        posicao: {col: 2, row: 2},
        reage:'Nao a reaçoes disponiveis'
    },
    'B': {
        nome: 'Boro',
        num_atomico: 5,
        massa_atomica: '10.81 u',
        grupo: 'Semimetais / Grupo 13',
        periodo: 2,
        descricao: 'É um micronutriente essencial para plantas e um mineral importante para a saúde humana',
        categoria: 'semi-metal',
        posicao: {col: 13, row:2 },
        reage:'Nao a reaçoes disponiveis'
    },
    'C': {
        nome: 'Carbono',
        num_atomico: 6,
        massa_atomica: '12.01 u',
        grupo: 'ametal / Grupo 14',
        periodo: 2,
        descricao: 'O carbono é fundamental para a vida, formando a base das moléculas orgânicas como carboidratos, proteínas e lipídios, além de ser um componente vital em compostos como o DNA e o gás carbônico',
        categoria: 'ametal',
        posicao: {col: 14, row: 2},
        reage:'H+C C+O Ca+C C+Si'
    },
    'N': {
        nome: 'Nitrogênio',
        num_atomico: 7,
        massa_atomica: '14.007 u',
        grupo: 'ametal / Grupo 15',
        periodo: 2,
        descricao: 'O nitrogênio é usado em diversos metal-alcalino-terra setores, como na produção de fertilizantes, nylon e explosivos na indústria química; para congelamento rápido de alimentos e criopreservação na indústria alimentícia e médica. Ele também é aplicado em processos de fabricação de metais (tratamento térmico, corte a laser, soldagem), na eletrônica (refrigeração, proteção) e em análise de amostras. ',
        categoria: 'ametal',
        posicao: {col: 15, row: 2},
        reage:'H+N N+O N+C Ca+N Mg+N Al+N'
    },
    'O': {
        nome: 'Oxigênio',
        num_atomico: 8,
        massa_atomica: '15.999 u',
        grupo: 'ametal / Grupo 16',
        periodo: 2,
        descricao: 'O oxigênio é essencial para a respiração celular em seres vivos, processo que gera a energia necessária para o funcionamento do corpo, incluindo as funções cerebrais. Ele é utilizado em diversas aplicações industriais, como na produção de aço e soldagem, e também é vital em tratamentos médicos para pacientes com problemas respiratórios ou em unidades de terapia intensiva. ',
        categoria: 'ametal',
        posicao: {col: 16, row: 2},
        reage:'H+O C+O Fe+O Mg+O Ca+O S+O Cu+O Al+O Zn+O P+O Na+O N+O K+O Si+O Ti+O Cr+O Mn+O Ni+O Co+O'
    },
    'F': {
        nome: 'Fluór',
        num_atomico: 9,
        massa_atomica: '18.998 u',
        grupo: 'halogenio / Grupo 17',
        periodo: 2,
        descricao: 'O flúor serve principalmente para prevenir cáries dentárias e fortalecer o esmalte dos dentes. Ele age remineralizando o esmalte, revertendo sinais iniciais de cárie e retardando a desmineralização. É encontrado na natureza, mas também é adicionado intencionalmente à água potável e usado em pastas de dente e tratamentos odontológicos para garantir a saúde bucal',
        categoria: 'halogenio',
        posicao: {col: 17, row: 2}
    },
    'Ne': {
        nome: 'Neônio',
        num_atomico: 10,
        massa_atomica: '20.180 u',
        grupo: 'Gás-Nobre / Grupo 18',
        periodo: 2,
        descricao: 'O neônio serve principalmente para iluminação (lâmpadas, letreiros, sinalizadores), lasers (geralmente em mistura com hélio) e criogenia (como gás líquido refrigerante). Também é usado em indicadores eletrônicos, detectores de radiação e na pesquisa científica, como na análise de partículas subatômicas',
        categoria: 'gas-nobre',
        posicao: {col: 18, row: 2}
    },
    'Na': {
        nome: 'Sódio',
        num_atomico: 11,
        massa_atomica: '22.990 u',
        grupo: 'Metal Alcalino / Grupo 1',
        periodo: 3,
        descricao: 'Metal muito reativo, usado em sal e baterias.',
        categoria: 'metal-alcalino',
        posicao: {col: 1, row: 3}
    },
    'Mg': {
        nome: 'Magnésio',
        num_atomico: 12,
        massa_atomica: '24.305 u',
        grupo: 'Metal Alcalinoterroso / Grupo 2',
        periodo: 3,
        descricao: 'O magnésio é usado pelo corpo para manter o bom funcionamento dos músculos e nervos, regular os níveis de açúcar no sangue e pressão arterial, e auxiliar na produção de proteínas, ossos e DNA. Ele também desempenha papéis importantes na saúde do coração, na qualidade do sono, na função imunológica e na prevenção de algumas doenças crônicas, como diabetes tipo 2 e doenças cardiovasculares',
        categoria: 'metal-alcalino-terra',
        posicao: {col: 2, row: 3}
    },
    'Al': {
        nome: 'Alumínio',
        num_atomico: 13,
        massa_atomica: '26.982 u',
        grupo: 'metal-pos-transicao / Grupo 13',
        periodo: 33,
        descricao: 'A utilidade do alumínio se deve às suas propriedades de ser leve, resistente à corrosão, bom condutor de calor e eletricidade, refletir luz e calor, e por ser infinitamente reciclável. Ele é amplamente utilizado na indústria automobilística, aeroespacial, de construção civil, elétrica e em embalagens de alimentos. ',
        categoria: 'metal-pos-transicao',
        posicao: {col: 13, row: 3}
    },
    'Si': {
        nome: 'Silício',
        num_atomico:14,
        massa_atomica: '28,085 u',
        grupo: 'semimetal / Grupo 14 ',
        periodo: 3,
        descricao: 'Semimetal usado em semicondutores e silicatos.',
        categoria: 'semi-metal',
        posicao: {col: 14, row: 3}
    },
    'P': {
        nome: 'Fósforo',
        num_atomico: 15,
        massa_atomica: '30,974 u',
        grupo: 'nao-metal / Grupo 15',
        periodo: 3,
        descricao: 'Não metal essencial para a vida, encontrado em ossos e DNA.',
        categoria: 'ametal',
        posicao: {col: 15, row: 3}
    },
    'S': {
        nome: 'Enxofre',
        num_atomico: 16,
        massa_atomica: '32,06 u',
        grupo: ' nao-metal / Grupo 16',
        periodo: 3,
        descricao: 'Não metal encontrado em minérios e na forma de ácido sulfúrico.',
        categoria: 'ametal',
        posicao: {col: 16, row: 3}
    },
    'Cl': {
        nome: 'Cloro',
        num_atomico: 17,
        massa_atomica: '35,45 u',
        grupo: 'halogenio / Grupo 17',
        periodo: 3,
        descricao: 'Halogênio altamente reativo, usado como desinfetante.',
        categoria: 'halogenio',
        posicao: {col: 17, row: 3}
    },
    'Ar': {
        nome: 'Argônio',
        num_atomico: 18,
        massa_atomica: '39,948 u',
        grupo: 'gas-nobre / Grupo 18 (Gases Nobres)',
        periodo: 3,
        descricao: 'Gás nobre inerte, usado em lâmpadas fluorescentes e soldagem.',
        categoria: 'gas-nobre',
        posicao: {col: 18, row: 3}
    },
    'K': {
        nome: 'Potássio',
        num_atomico: 19,
        massa_atomica: '39,10 u',
        grupo: 'metal-alcalino / Grupo 1',
        periodo: 4,
        descricao: 'Metal alcalino, essencial para a função nervosa.',
        categoria: 'metal-alcalino',
        posicao: {col: 1, row: 4}
    },
    'Ca': {
        nome: 'Cálcio',
        num_atomico: 20,
        massa_atomica: '40,08 u',
        grupo: ' metal-alcalino-terra/ Grupo 2',
        periodo: 4,
        descricao: 'Metal alcalino-terroso, fundamental para ossos e dentes.',
        categoria: 'metal-alcalino-terra',
        posicao: {col: 2, row: 4}
    },
    'Sc': {
        nome: 'Escândio',
        num_atomico: 21,
        massa_atomica: '44,96 u',
        grupo: 'metal-transicao / Grupo 3',
        periodo: 4,
        descricao: 'Metal de transição leve, usado em ligas aeroespaciais.',
        categoria: 'metal-transicao',
        posicao: {col: 3, row: 4}
    },
    'Ti': {
        nome: 'Titânio',
        num_atomico: 22,
        massa_atomica: '47,87 u',
        grupo: 'metal-transicao / Grupo 4',
        periodo: 4,
        descricao: 'Metal de transição, forte, leve e resistente à corrosão.',
        categoria: 'metal-transicao',
        posicao: {col: 4, row: 4}
    },
    'V': {
        nome: 'Vanádio',
        num_atomico: 23,
        massa_atomica: '50,94 u',
        grupo: 'metal-transicao/ Grupo 5',
        periodo: 4,
        descricao: 'Metal de transição, usado em aços-ferramenta e ligas.',
        categoria: 'metal-transicao',
        posicao: {col: 5, row: 4}
    },
    'Cr': {
        nome: 'Cromo',
        num_atomico: 24,
        massa_atomica: '52,00 u',
        grupo: 'metal-transicao / Grupo 6',
        periodo: 4,
        descricao: 'Metal de transição, usado para dar brilho e endurecer metais.',
        categoria: 'metal-transicao',
        posicao: {col: 6, row: 4}
    },
    'Mn': {
        nome: 'Manganês',
        num_atomico: 25,
        massa_atomica: '54,94 u',
        grupo: 'metal-transicao / Grupo 7',
        periodo: 4,
        descricao: 'Metal de transição, usado principalmente na produção de aço.',
        categoria: 'metal-transicao',
        posicao: {col: 7, row: 4}
    },
    'Fe': {
        nome: 'Ferro',
        num_atomico: 26,
        massa_atomica: '55,85 u',
        grupo: ' metal-transicao/ Grupo 8',
        periodo: 4,
        descricao: 'Metal de transição, base do aço e essencial no corpo humano.',
        categoria: 'metal-transicao',
        posicao: {col: 8, row: 4}
    },
    'Co': {
        nome: 'Cobalto',
        num_atomico: 27,
        massa_atomica: '58,93 u',
        grupo: 'metal-transicao / Grupo 9',
        periodo: 4,
        descricao: 'Metal de transição, usado em baterias e ímãs.',
        categoria: 'metal-transicao',
        posicao: {col: 9, row: 4}
    },
    'Ni': {
        nome: 'Níquel',
        num_atomico: 28,
        massa_atomica: '58,69 u',
        grupo: 'metal-transicao / Grupo 10',
        periodo: 4,
        descricao: 'Metal de transição, resistente à corrosão, usado em moedas.',
        categoria: 'metal-transicao',
        posicao: {col: 10, row: 4}
    },
    'Cu': {
        nome: 'Cobre',
        num_atomico: 29,
        massa_atomica: '63,55 u',
        grupo: 'metal-transicao / Grupo 11',
        periodo: 4,
        descricao: 'Metal de transição com alta condutividade elétrica.',
        categoria: 'metal-transicao',
        posicao: {col: 11, row: 4}
    },
    'Zn': {
        nome: 'Zinco',
        num_atomico: 30,
        massa_atomica: '65,38 u',
        grupo: 'metal-transicao / Grupo 12',
        periodo: 4,
        descricao: 'Metal de transição, usado para galvanizar ferro.',
        categoria: 'metal-transicao',
        posicao: {col: 12, row: 4}
    },
    'Ga': {
        nome: 'Gálio',
        num_atomico: 31,
        massa_atomica: '69,72 u',
        grupo: ' metal-pos-transicao/ Grupo 13',
        periodo: 4,
        descricao: 'Metal pós-transição com baixo ponto de fusão.',
        categoria: 'metal-pos-transicao',
        posicao: {col: 13, row: 4}
    },
    'Ge': {
        nome: 'Germânio',
        num_atomico: 32,
        massa_atomica: '72,63 u',
        grupo: 'semi-meta / Grupo 14',
        periodo: 4,
        descricao: 'Semimetal semicondutor, usado em fibra óptica.',
        categoria: 'semi-metal',
        posicao: {col: 14, row: 4}
    },
    'As': {
        nome: 'Arsênio',
        num_atomico: 33,
        massa_atomica: '74,92 u',
        grupo: 'semi-meta / Grupo 15',
        periodo: 4,
        descricao: 'Semimetal tóxico, usado em semicondutores.',
        categoria: 'semi-metal',
        posicao: {col: 15, row: 4}
    },
    'Se': {
        nome: 'Selênio',
        num_atomico: 34,
        massa_atomica: '78,97 u',
        grupo: 'ametal / Grupo 16',
        periodo: 4,
        descricao: 'Não metal, usado em fotocopiadoras e importante micronutriente.',
        categoria: 'ametal',
        posicao: {col: 16, row: 4}
    },
    'Br': {
        nome: 'Bromo',
        num_atomico: 35,
        massa_atomica: '79,90 u',
        grupo: ' helogenio/ Grupo 17',
        periodo: 4,
        descricao: 'O único halogênio líquido à temperatura ambiente, usado em retardantes de chama.',
        categoria: 'halogenio',
        posicao: {col: 17, row: 4}
    },
    'Kr': {
        nome: 'Criptônio',
        num_atomico: 36,
        massa_atomica: '83,80 u',
        grupo: ' gas-nobre/ Grupo 18',
        periodo: 4,
        descricao: 'Gás nobre, usado em algumas lâmpadas e lasers.',
        categoria: 'gas-nobre',
        posicao: {col: 18, row: 4}
    },
    'Rb': {
        nome: 'Rubídio',
        num_atomico: 37,
        massa_atomica: '85,47 u',
        grupo: 'metal-alcalino / Grupo 1',
        periodo: 5,
        descricao: 'Metal alcalino altamente reativo, usado em células fotoelétricas.',
        categoria: 'metal-alcalino',
        posicao: {col: 1, row: 5}
    },
    'Sr': {
        nome: 'Estrôncio',
        num_atomico: 38,
        massa_atomica: '87,62 u',
        grupo: ' metal-alcalino-terra / Grupo 2',
        periodo: 5,
        descricao: 'Metal alcalino-terroso, usado para produzir a cor vermelha em fogos de artifício.',
        categoria: 'metal-alcalino-terra',
        posicao: {col: 2, row: 5}
    },
    'Y': {
        nome: 'Ítrio',
        num_atomico: 39,
        massa_atomica: '88,91 u',
        grupo: 'metal-transicao / Grupo 3',
        periodo: 5,
        descricao: 'Metal de transição, usado em lasers e supercondutores.',
        categoria: 'metal-transicao',
        posicao: {col: 3, row: 5}
    },
    'Zr': {
        nome: 'Zircônio',
        num_atomico: 40,
        massa_atomica: '91,22 u',
        grupo: ' metal-transicao/ Grupo 4',
        periodo: 5,
        descricao: 'Metal de transição resistente à corrosão, usado em reatores nucleares.',
        categoria: 'metal-transicao',
        posicao: {col: 4, row: 5}
    },
    'Nb': {
        nome: 'Nióbio',
        num_atomico: 41,
        massa_atomica: '92,91 u',
        grupo: ' metal-transicao/ Grupo 5',
        periodo: 5,
        descricao: 'Metal de transição usado em superligas para jatos e foguetes.',
        categoria: 'metal-transicao',
        posicao: {col: 5, row: 5}
    },
    'Mo': {
        nome: 'Molibdênio',
        num_atomico: 42,
        massa_atomica: '95,94 u',
        grupo: ' metal-transicao/ Grupo 6',
        periodo: 5,
        descricao: 'Metal de transição de alto ponto de fusão, usado em ligas de aço.',
        categoria: 'metal-transicao',
        posicao: {col: 6, row: 5}
    },
    'Tc': {
        nome: 'Tecnécio',
        num_atomico: 43,
        massa_atomica: '(98) u',
        grupo: ' metal-transicao/ Grupo 7',
        periodo: 5,
        descricao: 'O elemento mais leve sem isótopos estáveis (radioativo), usado em medicina nuclear.',
        categoria: 'metal-transicao',
        posicao: {col: 7, row: 5}
    },
    'Ru': {
        nome: 'Rutênio',
        num_atomico: 44,
        massa_atomica: '101,07 u',
        grupo: 'metal-transicao / Grupo 8',
        periodo: 5,
        descricao: 'Metal de transição do grupo da platina, usado em contatos elétricos.',
        categoria: 'metal-transicao',
        posicao: {col: 8, row: 5}
    },
    'Rh': {
        nome: 'Ródio',
        num_atomico: 45,
        massa_atomica: '102,91 u',
        grupo: 'metal-transicao / Grupo 9',
        periodo: 5,
        descricao: 'Metal de transição nobre e muito raro, usado em catalisadores e joias.',
        categoria: 'metal-transicao',
        posicao: {col: 9, row: 5}
    },
    'Pd': {
        nome: 'Paládio',
        num_atomico: 46,
        massa_atomica: '106,42 u',
        grupo: 'metal-transicao / Grupo 10',
        periodo: 5,
        descricao: 'Metal de transição nobre, usado em conversores catalíticos e odontologia.',
        categoria: 'metal-transicao',
        posicao: {col: 10, row: 5}
    },
    'Ag': {
        nome: 'Prata',
        num_atomico: 47,
        massa_atomica: '107,87 u',
        grupo: 'metal-transicao / Grupo 11',
        periodo: 5,
        descricao: 'Metal de transição com maior condutividade elétrica e térmica.',
        categoria: 'metal-transicao',
        posicao: {col: 11, row: 5}
    },
    'Cd': {
        nome: 'Cádmio',
        num_atomico: 48,
        massa_atomica: '112,41 u',
        grupo: 'metal-transicao / Grupo 12',
        periodo: 5,
        descricao: 'Metal de transição tóxico, usado em baterias recarregáveis e barras de controle nuclear.',
        categoria: 'metal-transicao',
        posicao: {col: 12, row: 5}
    },
    'In': {
        nome: 'Índio',
        num_atomico: 49,
        massa_atomica: '114,82 u',
        grupo: 'metal-pos-transicao / Grupo 13',
        periodo: 5,
        descricao: 'Metal pós-transição macio, usado em telas de LCD e painéis solares.',
        categoria: 'metal-pos-transicao',
        posicao: {col: 13, row: 5}
    },
    'Sn': {
        nome: 'Estanho',
        num_atomico: 50,
        massa_atomica: '118,71 u',
        grupo: 'metal-pos-transicao / Grupo 14',
        periodo: 5,
        descricao: 'Metal pós-transição, usado em soldas, latas e ligas.',
        categoria: 'metal-pos-transicao',
        posicao: {col: 14, row: 5}
    },
    'Sb': {
        nome: 'Antimônio',
        num_atomico: 51,
        massa_atomica: '121,76 u',
        grupo: ' semi-metal/ Grupo 15',
        periodo: 5,
        descricao: 'Semimetal usado em ligas e retardantes de chamas.',
        categoria: 'semi-metal',
        posicao: {col: 15, row: 5}
    },
    'Te': {
        nome: 'Telúrio',
        num_atomico: 52,
        massa_atomica: '127,60 u',
        grupo: 'semi-metal / Grupo 16',
        periodo: 5,
        descricao: 'Semimetal, usado em ligas metálicas e semicondutores.',
        categoria: 'semi-metal',
        posicao: {col: 16, row: 5}
    },
    'I': {
        nome: 'Iodo',
        num_atomico: 53,
        massa_atomica: '126,90 u',
        grupo: 'halogenio / Grupo 17',
        periodo: 5,
        descricao: 'Halogênio sólido, essencial para a glândula tireoide, usado como desinfetante.',
        categoria: 'halogenio',
        posicao: {col: 17, row: 5}
    },
    'Xe': {
        nome: 'Xenônio',
        num_atomico: 54,
        massa_atomica: '131,29 u',
        grupo: 'gas-nobre / Grupo 18',
        periodo: 5,
        descricao: 'Gás nobre, usado em faróis de carros, lâmpadas de flash e propulsão iônica.',
        categoria: 'gas-nobre',
        posicao: {col: 18, row: 5}
    },
    'Cs': {
        nome: 'Césio',
        num_atomico: 55,
        massa_atomica: '132,91 u',
        grupo: ' metal-alcalino/ Grupo 1',
        periodo: 6,
        descricao: 'Metal alcalino mais reativo e macio, usado em relógios atômicos.',
        categoria: 'metal-alcalino',
        posicao: {col: 1, row: 6}
    },
    'Ba': {
        nome: 'Bário',
        num_atomico: 56,
        massa_atomica: '137,33 u',
        grupo: 'metal-alcalino-terra / Grupo 2',
        periodo: 6,
        descricao: 'Metal alcalino-terroso, usado em velas de ignição e exames de raio-X.',
        categoria: 'metal-alcalino-terra',
        posicao: {col: 2, row: 6}
    },
    'La': {
        nome: 'Lantânio',
        num_atomico: 57,
        massa_atomica: '138,91 u',
        grupo: 'metal-transicao / Grupo 3',
        periodo: 6,
        descricao: 'O primeiro dos lantanídeos (terras raras), usado em lentes de câmeras.',
        categoria: 'lantanideo',
        posicao: {col: 3, row: 6}
    },
    'Ce': {
        nome: 'Cério',
        num_atomico: 58,
        massa_atomica: '140,12 u',
        grupo: ' Lantanideo',
        periodo: 6,
        descricao: 'O lantanídeo mais abundante, usado em ligas de pederneira (isqueiros) e catalisadores.',
        categoria: 'Lantanideo',
        posicao: {col: 4, row: 8}
    },
    'Pr': {
        nome: 'Praseodímio',
        num_atomico: 59,
        massa_atomica: '140,91 u',
        grupo: 'Lantanídeos',
        periodo: 6,
        descricao: 'Lantanídeo, usado para colorir vidros verdes e amarelos (óculos de solda).',
        categoria: 'Lantanideo',
        posicao: {col: 5, row: 8}
    },
    'Nd': {
        nome: 'Neodímio',
        num_atomico: 60,
        massa_atomica: '144,24 u',
        grupo: 'Lantanídeos',
        periodo: 6,
        descricao: 'Lantanídeo, essencial para ímãs permanentes muito fortes.',
        categoria: 'Lantanideo',
        posicao: {col: 6, row: 8}
    },
    'Pm': {
        nome: 'Promécio',
        num_atomico: 61,
        massa_atomica: '(145) u',
        grupo: 'Lantanídeos(Radiotivo)',
        periodo: 6,
        descricao: 'O único lantanídeo radioativo, usado em fontes de luz e baterias nucleares.',
        categoria: 'Lantanideo',
        posicao: {col: 7, row: 8}
    },
    'Sm': {
        nome: 'Samário',
        num_atomico: 62,
        massa_atomica: '150,36 u',
        grupo: 'Lantanídeos',
        periodo: 6,
        descricao: 'Lantanídeo, usado em ímãs de alto desempenho e controle nuclear.',
        categoria: 'Lantanideo',
        posicao: {col: 8, row: 8}
    },
    'Eu': {
        nome: 'Európio',
        num_atomico: 63,
        massa_atomica: '151,96 u',
        grupo: 'Lantanídeos',
        periodo: 6,
        descricao: 'Lantanídeo, usado em fósforos para produzir a cor vermelha em telas de TV antigas e lâmpadas.',
        categoria: 'Lantanideo',
        posicao: {col: 9, row: 8}
    },
    'Gd': {
        nome: 'Gadolínio',
        num_atomico: 64,
        massa_atomica: '157,25 u',
        grupo: 'Lantanídeos',
        periodo: 6,
        descricao: 'Lantanídeo, usado em ressonância magnética (MRI) e barras de controle nuclear.',
        categoria: 'Lantanideo',
        posicao: {col: 10, row: 8}
    },
    'Tb': {
        nome: 'Térbio',
        num_atomico: 65,
        massa_atomica: '158,93 u',
        grupo: 'Lantanídeos',
        periodo: 6,
        descricao: 'Lantanídeo, usado em fósforos verdes em telas e na produção de ligas magnéticas.',
        categoria: 'Lantanideo',
        posicao: {col: 11, row: 8}
    },
    'Dy': {
        nome: 'Disprósio',
        num_atomico: 66,
        massa_atomica: '162,50 u',
        grupo: 'Lantanideos',
        periodo: 6,
        descricao: 'Lantanídeo, usado em materiais de ímãs de alto desempenho (NdFeB) e em lasers.',
        categoria: 'Lantanideo',
        posicao: {col: 12, row: 8}
    },
    'Ho': {
        nome: 'Hólmio',
        num_atomico: 67,
        massa_atomica: '164,93 u',
        grupo: 'Lantanideos',
        periodo: 6,
        descricao: 'Lantanídeo com as maiores propriedades magnéticas, usado em lasers infravermelhos.',
        categoria: 'Lantanideo',
        posicao: {col: 13, row: 8}
    },
    'Er': {
        nome: 'Érbio',
        num_atomico: 68,
        massa_atomica: '167,26 u',
        grupo: 'Lantanídeos',
        periodo: 6,
        descricao: 'Lantanídeo, usado como amplificador em fibras ópticas e para colorir vidro de rosa.',
        categoria: 'Lantanideo',
        posicao: {col: 14, row: 8},
        reage: ''
    },
    'Tm': {
        nome: 'Túlio',
        num_atomico: 69,
        massa_atomica: '168,93 u',
        grupo: 'Lantanídeos',
        periodo: 6,
        descricao: 'Lantanídeo, usado em cerâmicas supercondutoras e em fontes de raio-X portáteis.',
        categoria: 'Lantanideo',
        posicao: {col: 15, row: 8}
    },
    'Yb': {
        nome: 'Itérbio',
        num_atomico: 70,
        massa_atomica: '173,05 u',
        grupo: 'Lantanídeos',
        periodo: 6,
        descricao: 'Lantanídeo, usado em ligas de aço inoxidável e em lasers de alta potência.',
        categoria: 'Lantanideo',
        posicao: {col: 16, row: 8}
    },
    'Lu': {
        nome: 'Lutécio',
        num_atomico: 71,
        massa_atomica: '174,97 u',
        grupo: 'Lantanideo / Grupo 3',
        periodo: 6,
        descricao: 'O último dos lantanídeos, usado em tomografia por emissão de pósitrons (PET).',
        categoria: 'Lantanideo',
        posicao: {col: 17, row: 8}
    },
    'Hf': {
        nome: 'Háfnio',
        num_atomico: 72,
        massa_atomica: '178,49 u',
        grupo: 'metal-transicao / Grupo 4',
        periodo: 6,
        descricao: 'Metal de transição, usado em barras de controle nuclear devido à sua alta capacidade de absorção de nêutrons.',
        categoria: 'metal-transicao',
        posicao: {col: 4, row: 6}
    },
    'Ta': {
        nome: 'Tântalo',
        num_atomico: 73,
        massa_atomica: '180,95 u',
        grupo: 'metal-transicao / Grupo 5',
        periodo: 6,
        descricao: 'Metal de transição altamente resistente à corrosão e bioinerte, usado em capacitores e implantes cirúrgicos.',
        categoria: 'metal-transicao',
        posicao: {col: 5, row: 6}
    },
    'W': {
        nome: 'Tungstênio',
        num_atomico: 74,
        massa_atomica: '183,84 u',
        grupo: 'metal-transicao/ Grupo 6',
        periodo: 6,
        descricao: 'Metal de transição com o ponto de fusão mais alto de todos os elementos, usado em filamentos de lâmpadas.',
        categoria: 'metal-transicao',
        posicao: {col: 6, row: 6}
    },
    'Re': {
        nome: 'Rênio',
        num_atomico: 75,
        massa_atomica: '186,21 u',
        grupo: 'metal-transicao / Grupo 7',
        periodo: 6,
        descricao: 'Metal de transição raro e denso, usado em superligas de turbinas a jato e em catalisadores.',
        categoria: 'metal-transicao',
        posicao: {col: 7, row: 6}
    },
    'Os': {
        nome: 'Ósmio',
        num_atomico: 76,
        massa_atomica: '190,23 u',
        grupo: 'metal-transicao / Grupo 8',
        periodo: 6,
        descricao: 'O metal mais denso, usado em pontas de canetas e em contatos elétricos de alta resistência.',
        categoria: 'metal-transicao',
        posicao: {col: 8, row: 6}
    },
    'Ir': {
        nome: 'Irídio',
        num_atomico: 77,
        massa_atomica: '192,22 u',
        grupo: 'metal-transicao / Grupo 9',
        periodo: 6,
        descricao: 'Metal de transição mais resistente à corrosão, usado em velas de ignição e padrão de medida de peso.',
        categoria: 'metal-transicao',
        posicao: {col: 9, row: 6}
    },
    'Pt': {
        nome: 'Platina',
        num_atomico: 78,
        massa_atomica: '195,08 u',
        grupo: 'metal-transicao / Grupo 10',
        periodo: 6,
        descricao: 'Metal de transição nobre, usado em catalisadores automotivos, joias e equipamentos de laboratório.',
        categoria: 'metal-transicao',
        posicao: {col: 10, row: 6}
    },
    'Au': {
        nome: 'Ouro',
        num_atomico: 79,
        massa_atomica: '196,97 u',
        grupo: 'metal-transicao / Grupo 11',
        periodo: 6,
        descricao: 'Metal de transição nobre, resistente à corrosão, usado em joias, eletrônicos e reserva de valor.',
        categoria: 'metal-transicao',
        posicao: {col: 11, row: 6}
    },
    'Hg': {
        nome: 'Mercúrio',
        num_atomico: 80,
        massa_atomica: '200,59 u',
        grupo: ' metal-transicao / Grupo 12 ',
        periodo: 6,
        descricao: 'O único metal líquido à temperatura ambiente, usado em termômetros e barômetros.',
        categoria: 'metal-transicao',
        posicao: {col: 12, row: 6}
    },
    'Tl': {
        nome: 'Tálio',
        num_atomico: 81,
        massa_atomica: '204,38 u',
        grupo: 'metal-pos-transicao / Grupo 13',
        periodo: 6,
        descricao: 'Metal pós-transição altamente tóxico, usado em fibras ópticas e fotocélulas.',
        categoria: 'metal-pos-transicao',
        posicao: {col: 13, row: 6}
    },
    'Pb': {
        nome: 'Chumbo',
        num_atomico: 82,
        massa_atomica: '207,2 u',
        grupo: 'metal-pos-transicao / Grupo 14',
        periodo: 6,
        descricao: 'Metal pós-transição denso e macio, usado em baterias, proteção contra radiação e munição.',
        categoria: 'metal-pos-transicao',
        posicao: {col: 14, row: 6}
    },
    'Bi': {
        nome: 'Bismuto',
        num_atomico: 83,
        massa_atomica: '208,98 u',
        grupo: ' metal-pos-transicao/ Grupo 15',
        periodo: 6,
        descricao: 'Metal pós-transição, o mais pesado elemento estável; usado em cosméticos e ligas de baixo ponto de fusão.',
        categoria: 'metal-pos-transicao',
        posicao: {col: 15, row: 6}
    },
    'Po': {
        nome: 'Polônio',
        num_atomico: 84,
        massa_atomica: '(209) u',
        grupo: 'semi-metal / Grupo 16',
        periodo: 6,
        descricao: 'Semimetal altamente radioativo e raro, usado como fonte de nêutrons e em dispositivos antistáticos.',
        categoria: 'semi-metal',
        posicao: {col: 16, row: 6}
    },
    'At': {
        nome: 'Astato',
        num_atomico: 85,
        massa_atomica: '(210) u',
        grupo: 'halogenio / Grupo 17',
        periodo: 6,
        descricao: 'Halogênio extremamente raro e radioativo; o mais instável dos halogênios.',
        categoria: 'halogenio',
        posicao: {col: 17, row: 6}
    },
    'Rn': {
        nome: 'Radônio',
        num_atomico: 86,
        massa_atomica: '(222) u',
        grupo: 'Gás Nobre/ Grupo 18',
        periodo: 6,
        descricao: 'Gás nobre radioativo, subproduto do decaimento do urânio e do tório; risco ambiental.',
        categoria: 'gas-nobre',
        posicao: {col: 18, row: 6}
    },
    'Fr': {
        nome: 'Frâncio',
        num_atomico: 87,
        massa_atomica: '(223) u',
        grupo: 'metal-alcalino/ Grupo 11',
        periodo: 7,
        descricao: 'Metal alcalino altamente radioativo; o segundo elemento mais raro encontrado na natureza.',
        categoria: 'metal-alcalino',
        posicao: {col: 1, row: 7}
    },
    'Ra': {
        nome: 'Rádio',
        num_atomico: 88,
        massa_atomica: '(226) u',
        grupo: 'metal-alcalino-terra / Grupo 2',
        periodo: 7,
        descricao: 'Metal alcalino-terroso altamente radioativo; usado em tintas luminosas no passado (não mais usado).',
        categoria: 'metal-alcalino-terra',
        posicao: {col: 2, row: 7}
    },
    'Ac': {
        nome: 'Actínio',
        num_atomico: 89,
        massa_atomica: '(227) u',
        grupo: 'Actinídios / Grupo 3',
        periodo: 7,
        descricao: 'O primeiro dos actinídeos, altamente radioativo e usado em geradores termoelétricos de rádio.',
        categoria: 'actinideos',
        posicao: {col: 3, row: 7}
    },
    'Th': {
        nome: 'Tório',
        num_atomico: 90,
        massa_atomica: '232,04 u',
        grupo: 'Actinídeos / Grupo 3',
        periodo: 7,
        descricao: 'Actinídeo fracamente radioativo, usado em ligas e potencialmente em reatores nucleares (ciclo do tório).',
        categoria: 'Actinideos',
        posicao: {col: 4, row: 9}
    },
    'Pa': {
        nome: 'Protactínio',
        num_atomico: 91,
        massa_atomica: '231,04 u',
        grupo: 'Actinídeos / Grupo 3',
        periodo: 7,
        descricao: 'Actinídeo raro e altamente radioativo; subproduto do decaimento do urânio.',
        categoria: 'Actinideos',
        posicao: {col: 5, row: 9}
    },
    'U': {
        nome: 'Urânio',
        num_atomico: 92,
        massa_atomica: '238,03 u',
        grupo: 'Actinídeos / Grupo 3',
        periodo: 7,
        descricao: 'Actinídeo fundamental para energia nuclear e armas atômicas (isótopo $^{235}$U).',
        categoria: 'Actinideos',
        posicao: {col: 6, row: 9}
    },
    'Np': {
        nome: 'Netúnio',
        num_atomico: 93,
        massa_atomica: '(237) u',
        grupo: 'Actinídeos / Grupo 3',
        periodo: 7,
        descricao: 'O primeiro elemento transurânico, radioativo; subproduto de reações nucleares.',
        categoria: 'Actinideos',
        posicao: {col: 7, row: 9}
    },
    'Pu': {
        nome: 'Plutônio',
        num_atomico: 94,
        massa_atomica: '(244) u',
        grupo: 'Actinídeos / Grupo 3',
        periodo: 7,
        descricao: 'Actinídeo altamente radioativo; principal material físsil usado em reatores e armas nucleares.',
        categoria: 'Actinideos',
        posicao: {col: 8, row: 9}
    },
    'Am': {
        nome: 'Amerício',
        num_atomico: 95,
        massa_atomica: '(243) u',
        grupo: 'Actinídeos / Grupo 3',
        periodo: 7,
        descricao: 'Actinídeo radioativo, usado em detectores de fumaça e fontes de nêutrons.',
        categoria: 'Actinideos',
        posicao: {col: 9, row: 9}
    },
    'Cm': {
        nome: 'Cúrio',
        num_atomico: 96,
        massa_atomica: '(247) u',
        grupo: 'Actinídeos / Grupo 3',
        periodo: 7,
        descricao: 'Actinídeo radioativo; usado em geradores de energia em sondas espaciais.',
        categoria: 'Actinideos',
        posicao: {col: 10, row: 9}
    },
    'Bk': {
        nome: 'Berquélio',
        num_atomico: 97,
        massa_atomica: '(247) u',
        grupo: 'Actinídeos / Grupo 3',
        periodo: 7,
        descricao: 'Actinídeo sintético e radioativo; usado principalmente para fins de pesquisa.',
        categoria: 'Actinideos',
        posicao: {col: 11, row: 9}
    },
    'Cf': {
        nome: 'Califórnio',
        num_atomico: 98,
        massa_atomica: '(251) u',
        grupo: 'Actinídeos / Grupo 3',
        periodo: 7,
        descricao: 'Actinídeo sintético e radioativo, forte emissor de nêutrons; usado para iniciar reatores e em radiografia.',
        categoria: 'Actinideos',
        posicao: {col: 12, row: 9}
    },
    'Es': {
        nome: 'Einstênio',
        num_atomico: 99,
        massa_atomica: '(252) u',
        grupo: 'Actinídeos / Grupo 3',
        periodo: 7,
        descricao: 'Actinídeo sintético e radioativo, descoberto após o primeiro teste de bomba de hidrogênio.',
        categoria: 'Actinideos',
        posicao: {col: 13, row: 9}
    },
    'Fm': {
        nome: 'Férmio',
        num_atomico: 100,
        massa_atomica: '(257) u',
        grupo: 'Actinídeos / Grupo 3',
        periodo: 7,
        descricao: 'Actinídeo sintético, nomeado em homenagem a Enrico Fermi, descoberto em restos de testes nucleares.',
        categoria: 'Actinideos',
        posicao: {col: 14, row: 9}
    },
    'Md': {
        nome: 'Mendelévio',
        num_atomico: 101,
        massa_atomica: '(258) u',
        grupo: 'Actinídeos / Grupo 3',
        periodo: 7,
        descricao: 'Actinídeo sintético, nomeado em homenagem a Dmitri Mendeleev, o criador da Tabela Periódica.',
        categoria: 'Actinideos',
        posicao: {col: 15, row: 9}
    },
    'No': {
        nome: 'Nobélio',
        num_atomico: 102,
        massa_atomica: '(259) u',
        grupo: 'Actinídeos / Grupo 3',
        periodo: 7,
        descricao: 'Actinídeo sintético, nomeado em homenagem a Alfred Nobel, o inventor da dinamite.',
        categoria: 'Actinideos',
        posicao: {col: 16, row: 9}
    },
    'Lr': {
        nome: 'Laurêncio',
        num_atomico: 103,
        massa_atomica: '(266) u',
        grupo: 'Actinídeos / Grupo 3',
        periodo: 7,
        descricao: 'O último dos Actinídeos, sintético, nomeado em homenagem a Ernest O. Lawrence (inventor do ciclotron).',
        categoria: 'Actinideos',
        posicao: {col: 17, row: 9}
    },
    'Rf': {
        nome: 'Rutherfórdio',
        num_atomico: 104,
        massa_atomica: '(267) u',
        grupo: 'metal-transicao / Grupo 4',
        periodo: 7,
        descricao: 'Metal de transição sintético, nomeado em homenagem a Ernest Rutherford.',
        categoria: 'metal-transicao',
        posicao: {col: 4, row: 7}
    },
    'Db': {
        nome: 'Dúbnio',
        num_atomico: 105,
        massa_atomica: '(268) u',
        grupo: 'metal-transicao/ Grupo 5',
        periodo: 7,
        descricao: 'Metal de transição sintético, nomeado em homenagem à cidade russa de Dubna.',
        categoria: 'metal-transicao',
        posicao: {col: 5, row: 7}
    },
    'Sg': {
        nome: 'Seabórgio',
        num_atomico: 106,
        massa_atomica: '(269) u',
        grupo: 'metal-transicao / Grupo 6',
        periodo: 7,
        descricao: 'Metal de transição sintético, nomeado em homenagem a Glenn T. Seaborg (que reorganizou a Tabela).',
        categoria: 'metal-transicao',
        posicao: {col: 6, row: 7}
    },
    'Bh': {
        nome: 'Bóhrio',
        num_atomico: 107,
        massa_atomica: '(270) u',
        grupo: 'metal-transicao/ Grupo 7',
        periodo: 7,
        descricao: 'Metal de transição sintético, nomeado em homenagem a Niels Bohr.',
        categoria: 'metal-transicao',
        posicao: {col: 7, row: 7}
    },
    'Hs': {
        nome: 'Hássio',
        num_atomico: 108,
        massa_atomica: '(277) u',
        grupo: 'metal-transicao / Grupo 8',
        periodo: 7,
        descricao: 'Metal de transição sintético, nomeado em homenagem ao estado alemão de Hesse.',
        categoria: 'metal-transicao',
        posicao: {col: 8, row: 7}
    },
    'Mt': {
        nome: 'Meitnério',
        num_atomico: 109,
        massa_atomica: '(278) u',
        grupo: 'metal-transicao / Grupo 9',
        periodo: 7,
        descricao: 'Metal de transição sintético, nomeado em homenagem a Lise Meitner.',
        categoria: 'metal-transicao',
        posicao: {col: 9, row: 7}
    },
    'Ds': {
        nome: 'Darmstádtio',
        num_atomico: 110,
        massa_atomica: '(281) u',
        grupo: 'metal-transicao / Grupo 10',
        periodo: 7,
        descricao: 'Metal de transição sintético, nomeado em homenagem à cidade alemã de Darmstadt.',
        categoria: 'metal-transicao',
        posicao: {col: 10, row: 7}
    },
    'Rg': {
        nome: 'Roentgênio',
        num_atomico: 111,
        massa_atomica: '(282) u',
        grupo: 'metal-transicao / Grupo 11',
        periodo: 7,
        descricao: 'Metal de transição sintético, nomeado em homenagem a Wilhelm Röntgen (descrobridor do raio-X).',
        categoria: 'metal-transicao',
        posicao: {col: 11, row: 7}
    },
    'Cn': {
        nome: 'Copernício',
        num_atomico: 112,
        massa_atomica: '(285) u',
        grupo: 'metal-transicao/ Grupo 12',
        periodo: 7,
        descricao: 'Metal de transição sintético, nomeado em homenagem a Nicolau Copérnico.',
        categoria: 'metal-transicao',
        posicao: {col: 12, row: 7}
    },
    'Nh': {
        nome: 'Nihônio',
        num_atomico: 113,
        massa_atomica: '(286) u',
        grupo: 'outros-metais/ Grupo 13',
        periodo: 7,
        descricao: 'Metal pós-transição sintético, nomeado em homenagem ao Japão (Nihon).',
        categoria: 'metal-pos-transicao',
        posicao: {col: 13, row: 7}
    },
    'Fl': {
        nome: 'Fleróvio',
        num_atomico: 114,
        massa_atomica: '(289) u',
        grupo: 'metal-pos-transicao/ Grupo 14',
        periodo: 7,
        descricao: 'Metal pós-transição sintético, nomeado em homenagem ao Laboratório Flerov de Reações Nucleares.',
        categoria: 'metal-pos-transicao',
        posicao: {col: 14, row: 7}
    },
    'Mc': {
        nome: 'Moscóvio',
        num_atomico: 115,
        massa_atomica: '(290) u',
        grupo: 'metal-transicao/ Grupo 15',
        periodo: 7,
        descricao: 'Metal pós-transição sintético, nomeado em homenagem à região de Moscou.',
        categoria: 'metal-pos-transicao',
        posicao: {col: 15, row: 7}
    },
    'Lv': {
        nome: 'Livermório',
        num_atomico: 116,
        massa_atomica: '(293) u',
        grupo: 'metal-pos-transicao/ Grupo 16',
        periodo: 7,
        descricao: 'Metal pós-transição sintético, nomeado em homenagem ao Laboratório Nacional Lawrence Livermore.',
        categoria: 'metal-pos-transicao',
        posicao: {col: 16, row: 7}
    },
    'Ts': {
        nome: 'Tenesso',
        num_atomico: 117,
        massa_atomica: '(294) u',
        grupo: 'halogenios / Grupo 17',
        periodo: 7,
        descricao: 'Halogênio sintético, nomeado em homenagem ao estado do Tennessee, nos EUA.',
        categoria: 'halogenio',
        posicao: {col: 17, row: 7}
    },
    'Og': {
        nome: 'Oganessônio',
        num_atomico: 118,
        massa_atomica: '(294) u',
        grupo: 'gas-nobre',
        periodo: 7,
        descricao: 'O último elemento conhecido, um Gás Nobre sintético, nomeado em homenagem a Yuri Oganessian.',
        categoria: 'gas-nobre',
        posicao: {col: 18, row: 7}
    }
};

/* ========================
 BANCO DE REAÇÕES
======================== */
const bancoReacoes = {
  // Hidrogênio
  "H+O": { produto: "H₂O", equacao: "2H₂ + O₂ → 2H₂O", tipo: "Síntese", descricao: "Formação de água por combinação de hidrogênio e oxigênio (reação explosiva)." },
  "H+N": { produto: "NH₃", equacao: "3H₂ + N₂ → 2NH₃", tipo: "Síntese (Haber-Bosch)", descricao: "Produção industrial de amônia." },
  "H+Cl": { produto: "HCl", equacao: "H₂ + Cl₂ → 2HCl", tipo: "Síntese", descricao: "Forma ácido clorídrico gasoso." },

  // Lítio
  "Li+N": { produto: "Li₃N", equacao: "6Li + N₂ → 2Li₃N", tipo: "Síntese", descricao: "Nitreto de lítio, formado em reações diretas do metal com nitrogênio." },
  "Li+O": { produto: "Li₂O", equacao: "4Li + O₂ → 2Li₂O", tipo: "Oxidação", descricao: "Óxidos/peróxidos do lítio formam-se ao expor o metal ao ar." },

  // Berílio
  "Be+Cl": { produto: "BeCl₂", equacao: "Be + Cl₂ → BeCl₂", tipo: "Síntese", descricao: "Cloreto de berílio, composto covalente/iodado." },
  "Be+O": { produto: "BeO", equacao: "2Be + O₂ → 2BeO", tipo: "Oxidação", descricao: "Óxido refratário de berílio." },

  // Boro
  "B+O": { produto: "B₂O₃", equacao: "4B + 3O₂ → 2B₂O₃", tipo: "Oxidação", descricao: "Trióxido de boro, usado em vidros borossilicato." },
  "B+Cl": { produto: "BCl₃", equacao: "2B + 3Cl₂ → 2BCl₃", tipo: "Síntese", descricao: "Tricloreto de boro, reagente volátil." },

  // Carbono (reacões diretas mais comuns)
  "C+O": { produto: "CO₂", equacao: "C + O₂ → CO₂", tipo: "Combustão", descricao: "Combustão completa do carbono." },
  "C+O_partial": { produto: "CO", equacao: "2C + O₂ → 2CO", tipo: "Oxidação parcial", descricao: "Monóxido de carbono formado em combustão deficiente." },

  // Nitrogênio
  "N+O": { produto: "NO", equacao: "N₂ + O₂ → 2NO (em altas temperaturas)", tipo: "Síntese/oxidação térmica", descricao: "Óxidos de nitrogênio formados em chamas e motores." },

  // Oxigênio (reage com praticamente todos os metais)
  "Fe+O": { produto: "Fe₂O₃", equacao: "4Fe + 3O₂ → 2Fe₂O₃", tipo: "Oxidação", descricao: "Ferrugem (óxido de ferro III)."},
  "Al+O": { produto: "Al₂O₃", equacao: "4Al + 3O₂ → 2Al₂O₃", tipo: "Oxidação", descricao: "Óxido protetor do alumínio." },

  // Flúor (reage com quase tudo)
  "F+H": { produto: "HF", equacao: "H₂ + F₂ → 2HF", tipo: "Síntese", descricao: "Ácido fluorídrico (muito corrosivo)."},
  "F+Xe": { produto: "XeF₂", equacao: "Xe + F₂ → XeF₂", tipo: "Síntese (gases nobres)", descricao: "Difluoreto de xenônio — composto real e documentado." },

  // Sódio
  "Na+Cl": { produto: "NaCl", equacao: "2Na + Cl₂ → 2NaCl", tipo: "Síntese", descricao: "Sal comum formado por reação direta entre sódio metálico e cloro." },
  "Na+O": { produto: "Na₂O", equacao: "4Na + O₂ → 2Na₂O", tipo: "Oxidação", descricao: "Óxido do sódio formado quando o metal queima." },

  // Magnésio
  "Mg+O": { produto: "MgO", equacao: "2Mg + O₂ → 2MgO", tipo: "Combustão", descricao: "Queima do magnésio; chama branca intensa." },

  // Alumínio (tem reações com halogênios e oxigênio — oxido já acima)
  "Al+Cl": { produto: "AlCl₃", equacao: "2Al + 3Cl₂ → 2AlCl₃", tipo: "Síntese", descricao: "Cloreto de alumínio, usado como catalisador." },

  // Silício
  "Si+O": { produto: "SiO₂", equacao: "Si + O₂ → SiO₂", tipo: "Oxidação", descricao: "Dióxido de silício: quartzo/areia." },
  "Si+Cl": { produto: "SiCl₄", equacao: "Si + 2Cl₂ → SiCl₄", tipo: "Síntese", descricao: "Tetracloreto volátil usado na produção de silício puro." },

  // Fósforo
  "P+O": { produto: "P₄O₁₀", equacao: "P₄ + 5O₂ → P₄O₁₀", tipo: "Combustão", descricao: "Pentóxido de fósforo, dessecante forte." },

  // Enxofre
  "S+O": { produto: "SO₂", equacao: "S + O₂ → SO₂", tipo: "Combustão", descricao: "Dióxido de enxofre, gás poluente." },

  // Cloro
  "Cl+Na": { produto: "NaCl", equacao: "2Na + Cl₂ → 2NaCl", tipo: "Síntese", descricao: "Formação de cloreto de sódio (sal)."},
  "Cl+H2O": { produto: "HCl + HOCl", equacao: "Cl₂ + H₂O ⇌ HCl + HOCl", tipo: "Disproporcionação", descricao: "Relevante em desinfecção de água." },

  // Potássio
  "K+Cl": { produto: "KCl", equacao: "2K + Cl₂ → 2KCl", tipo: "Síntese", descricao: "Cloreto de potássio, fertilizante." },

  // Cálcio
  "Ca+O": { produto: "CaO", equacao: "2Ca + O₂ → 2CaO", tipo: "Oxidação", descricao: "Cal virgem (óxido de cálcio)."},

  // Escândio
  "Sc+Cl": { produto: "ScCl₃", equacao: "2Sc + 3Cl₂ → 2ScCl₃", tipo: "Síntese", descricao: "Cloreto de escândio, usado em cerâmicas e pesquisa." },

  // Titânio
  "Ti+O": { produto: "TiO₂", equacao: "Ti + O₂ → TiO₂", tipo: "Oxidação", descricao: "Dióxido de titânio, pigmento branco." },
  "Ti+N": { produto: "TiN", equacao: "Ti + 1/2 N₂ → TiN (síntese a altas T)", tipo: "Síntese", descricao: "Nitreto de titânio, revestimento duro." },

  // Vanádio
  "V+O": { produto: "V₂O₅", equacao: "4V + 5O₂ → 2V₂O₅", tipo: "Oxidação", descricao: "Pentóxido de vanádio, catalisador." },

  // Cromo
  "Cr+O": { produto: "Cr₂O₃", equacao: "4Cr + 3O₂ → 2Cr₂O₃", tipo: "Oxidação", descricao: "Óxido verde de cromo." },

  // Manganês
  "Mn+O": { produto: "MnO₂", equacao: "Mn + O₂ → MnO₂", tipo: "Oxidação", descricao: "Dióxido de manganês, usado em pilhas." },

  // Ferro (outros haletos e óxidos)
  "Fe+Cl": { produto: "FeCl₂", equacao: "Fe + Cl₂ → FeCl₂", tipo: "Síntese", descricao: "Cloreto ferroso." },

  // Cobalto
  "Co+O": { produto: "Co₃O₄", equacao: "3Co + 2O₂ → Co₃O₄", tipo: "Oxidação", descricao: "Óxido misto do cobalto." },

  // Níquel
  "Ni+O": { produto: "NiO", equacao: "2Ni + O₂ → 2NiO", tipo: "Oxidação", descricao: "Óxido de níquel." },

  // Cobre
  "Cu+O": { produto: "CuO", equacao: "2Cu + O₂ → 2CuO", tipo: "Oxidação", descricao: "Óxido preto de cobre." },
  "Cu+S": { produto: "Cu₂S", equacao: "2Cu + S → Cu₂S", tipo: "Síntese", descricao: "Sulfeto de cobre (calcocita)."},

  // Zinco
  "Zn+O": { produto: "ZnO", equacao: "2Zn + O₂ → 2ZnO", tipo: "Oxidação", descricao: "Óxido de zinco." },

  // Gálio
  "Ga+Cl": { produto: "GaCl₃", equacao: "2Ga + 3Cl₂ → 2GaCl₃", tipo: "Síntese", descricao: "Tricloreto de gálio." },

  // Germânio
  "Ge+Cl": { produto: "GeCl₄", equacao: "Ge + 2Cl₂ → GeCl₄", tipo: "Síntese", descricao: "Tetracloreto de germânio." },

  // Arsênio
  "As+S": { produto: "As₂S₃", equacao: "2As + 3S → As₂S₃", tipo: "Síntese", descricao: "Trissulfeto de arsênio (orpimento)."},

  // Selênio
  "Se+H": { produto: "H₂Se", equacao: "Se + H₂ → H₂Se", tipo: "Síntese", descricao: "Seleneto de hidrogênio, gás tóxico." },

  // Bromo
  "Br+K": { produto: "KBr", equacao: "Cl₂ + 2K → 2KBr (via Br2)", tipo: "Síntese", descricao: "Brometo de potássio (reação haleto similar)." },

  // Criptônio
  "Kr+F": { produto: "KrF₂", equacao: "Kr + F₂ → KrF₂", tipo: "Síntese", descricao: "Difluoreto de criptônio — composto real documentado." },

  // Rubídio
  "Rb+O": { produto: "Rb₂O", equacao: "4Rb + O₂ → 2Rb₂O", tipo: "Oxidação", descricao: "Óxido reativo de rubídio." },

  // Estrôncio
  "Sr+O": { produto: "SrO", equacao: "2Sr + O₂ → 2SrO", tipo: "Oxidação", descricao: "Óxido de estrôncio." },

  // Ítrio
  "Y+Cl": { produto: "YCl₃", equacao: "2Y + 3Cl₂ → 2YCl₃", tipo: "Síntese", descricao: "Tricloreto de ítrio." },

  // Zircônio
  "Zr+Cl": { produto: "ZrCl₄", equacao: "Zr + 2Cl₂ → ZrCl₄", tipo: "Síntese", descricao: "Tetracloreto de zircônio." },

  // Nióbio
  "Nb+O": { produto: "Nb₂O₅", equacao: "4Nb + 5O₂ → 2Nb₂O₅", tipo: "Oxidação", descricao: "Óxido de nióbio." },

  // Molibdênio
  "Mo+S": { produto: "MoS₂", equacao: "Mo + 2S → MoS₂", tipo: "Síntese", descricao: "Dissulfeto de molibdênio, lubrificante seco." },

  // Rutênio
  "Ru+Cl": { produto: "RuCl₃", equacao: "2Ru + 3Cl₂ → 2RuCl₃", tipo: "Síntese", descricao: "Tricloreto de rutênio." },

  // Paládio
  "Pd+H": { produto: "PdHx", equacao: "Pd + x/2 H₂ → PdHx (absorção)", tipo: "Absorção", descricao: "Paládio absorve hidrogênio em suas redes." },

  // Prata
  "Ag+Cl": { produto: "AgCl", equacao: "Ag + Cl₂ → AgCl", tipo: "Síntese", descricao: "Cloreto de prata, sensível à luz." },

  // Cádmio
  "Cd+Cl": { produto: "CdCl₂", equacao: "Cd + Cl₂ → CdCl₂", tipo: "Síntese", descricao: "Diclorido de cádmio (tóxico)."},

  // Índio
  "In+Cl": { produto: "InCl₃", equacao: "2In + 3Cl₂ → 2InCl₃", tipo: "Síntese", descricao: "Tricloreto de índio." },

  // Estanho
  "Sn+O": { produto: "SnO₂", equacao: "Sn + O₂ → SnO₂", tipo: "Oxidação", descricao: "Dióxido de estanho." },

  // Antimônio
  "Sb+Cl": { produto: "SbCl₃", equacao: "2Sb + 3Cl₂ → 2SbCl₃", tipo: "Síntese", descricao: "Tricloreto de antimônio." },

  // Telúrio
  "Te+O": { produto: "TeO₂", equacao: "Te + O₂ → TeO₂", tipo: "Oxidação", descricao: "Dióxido de telúrio." },

  // Iodo
  "I+Na": { produto: "NaI", equacao: "I₂ + 2Na → 2NaI", tipo: "Síntese", descricao: "Iodeto de sódio." },

  // Xenônio
  "Xe+F": { produto: "XeF₄", equacao: "Xe + 2F₂ → XeF₄", tipo: "Síntese", descricao: "Tetrafluoreto de xenônio — composto real documentado." },

  // Césio
  "Cs+O": { produto: "Cs₂O", equacao: "4Cs + O₂ → 2Cs₂O", tipo: "Oxidação", descricao: "Óxido de césio." },

  // Bário
  "Ba+Cl": { produto: "BaCl₂", equacao: "Ba + Cl₂ → BaCl₂", tipo: "Síntese", descricao: "Cloreto de bário." },

  // Lantânio
  "La+Cl": { produto: "LaCl₃", equacao: "2La + 3Cl₂ → 2LaCl₃", tipo: "Síntese", descricao: "Tricloreto de lantânio." },

  // Cério
  "Ce+O": { produto: "CeO₂", equacao: "Ce + O₂ → CeO₂", tipo: "Oxidação", descricao: "Dióxido de cério, catalisador." },

  // Neodímio (exemplo de liga/composto relevante)
  "Fe+Nd": { produto: "Nd₂Fe₁₄B (liga)", equacao: "2Nd + 14Fe + B → Nd₂Fe₁₄B (liga)", tipo: "Síntese/ligação metálica", descricao: "Composição típica para ímãs de neodímio (simplificada)." },

  // Urânio
  "U+O": { produto: "UO₂", equacao: "U + O₂ → UO₂", tipo: "Oxidação", descricao: "Dióxido de urânio, combustível nuclear." },

  // Neptúnio
  "Np+O": { produto: "NpO₂", equacao: "Np + O₂ → NpO₂", tipo: "Oxidação", descricao: "Dióxido de neptúnio (química radioativa)." },

  // Plutônio
  "Pu+O": { produto: "PuO₂", equacao: "Pu + O₂ → PuO₂", tipo: "Oxidação", descricao: "Dióxido de plutônio." },

  // Amerício
  "Am+O": { produto: "AmO₂", equacao: "2Am + O₂ → 2AmO₂", tipo: "Oxidação", descricao: "Dióxido de amerício." },

  // Cúrio
  "Cm+O": { produto: "CmO₂", equacao: "Cm + O₂ → CmO₂", tipo: "Oxidação", descricao: "Dióxido de cúrio (química radioativa)."},

  // Observações finais: elementos como He, Ne, Ar em condições normais não formam compostos estáveis amplamente documentados
  // (Xe e Kr têm compostos reais como XeF4, XeF2, KrF2). Elementos superpesados (Z>100) têm química extremamente limitada;
  // muitas reações são hipotéticas ou não observadas em quantidades mensuráveis, por isso foram omitidas.
};

function formatarCategoria(categoria) {
  return String(categoria || "").toLowerCase().replace(/[^a-z0-9-]/g, "-");
}

/* ========================
 CRIAR ELEMENTOS NA TABELA
======================== */
function criarElemento(simbolo) {
  const info = dadosElementos[simbolo];
  if (!info) return;

  const div = document.createElement('div');
  div.className = `elemento ${formatarCategoria(info.categoria)}`;
  if (info.posicao && info.posicao.col) div.style.gridColumn = info.posicao.col;
  if (info.posicao && info.posicao.row) div.style.gridRow = info.posicao.row;
  div.tabIndex = 0;
  div.dataset.simbolo = simbolo;

  div.innerHTML = `
    <div class="conteudo">
      <h1 class="numero-atomico">${info.num_atomico}</h1>
      <span class="simbolo">${simbolo}</span>
      <span class="nome-elemento">${info.nome}</span>
    </div>
  `;

  div.addEventListener('click', (e) => {
    e.stopPropagation();
    mostrarPainelInfo(info, simbolo);
    paineisContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  div.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    toggleSelecao(simbolo, div);
    paineisContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  tabela.appendChild(div);
}

function popularTabela() {
  Object.keys(dadosElementos).forEach(simbolo => criarElemento(simbolo));
}

/* ========================
 PAINEL INFORMAÇÕES
======================== */
function mostrarPainelInfo(info, simbolo) {
  painelInfo.classList.remove('vazio');
  painelInfo.innerHTML = `
    <div class="painel-conteudo">
      <button class="fechar-painel" id="fechar-painel">&times;</button>
      <div class="painel-info">
        <div class="painel-simbolo">${simbolo}</div>
        <div class="painel-dados">
          <h1>${info.nome} (${info.num_atomico})</h1>
          <p><strong>Massa Atômica:</strong> ${info.massa_atomica}</p>
          <p><strong>Grupo:</strong> ${info.grupo}</p>
          <p><strong>Período:</strong> ${info.periodo}</p>
          <p>${info.descricao}</p>
        </div>
      </div>
    </div>
  `;
  const btn = painelInfo.querySelector('#fechar-painel');
  if (btn) btn.onclick = fecharPainelInfo;
}
function fecharPainelInfo() {
  painelInfo.classList.add('vazio');
  painelInfo.innerHTML = 'Clique em um elemento para ver os detalhes aqui 👇';
}

/* ========================
 SELEÇÃO / REAÇÃO
======================== */
function toggleSelecao(simbolo, div) {
  if (div.classList.contains('selecionado')) {
    div.classList.remove('selecionado');
    elementosSelecionados = elementosSelecionados.filter(s => s !== simbolo);
    return;
  }
  if (elementosSelecionados.length < 2) {
    div.classList.add('selecionado');
    elementosSelecionados.push(simbolo);
  }
  if (elementosSelecionados.length === 2) {
    realizarReacao();
  }
}

function realizarReacao() {
  if (elementosSelecionados.length !== 2) return;
  const [A, B] = [...elementosSelecionados];

  const k1 = `${A}+${B}`;
  const k2 = `${B}+${A}`;
  const reacao = bancoReacoes[k1] || bancoReacoes[k2] || null;

  // efeitos visuais
  const divA = document.querySelector(`.elemento[data-simbolo="${A}"]`);
  const divB = document.querySelector(`.elemento[data-simbolo="${B}"]`);
  if (divA) divA.classList.add('reagindo');
  if (divB) divB.classList.add('reagindo');

  setTimeout(()=> {
    if (divA) divA.classList.remove('reagindo');
    if (divB) divB.classList.remove('reagindo');
  }, 750);

  mostrarPainelReacao(reacao, A, B);
  adicionarHistorico([A,B], reacao);

  // limpar seleção
  elementosSelecionados = [];
  document.querySelectorAll('.elemento.selecionado').forEach(el => el.classList.remove('selecionado'));

  // scroll suave
  paineisContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ========================
 PAINEL REACAO
======================== */

function mostrarPainelReacao(reacao, A, B) {
  painelReacao.classList.remove('vazio');

  if (reacao) {
    painelReacao.innerHTML = `
      <h2>⚡ Reação Encontrada</h2>
      <p><strong>${A} + ${B} → ${reacao.produto}</strong></p>
      <p><strong>Equação:</strong> ${reacao.equacao}</p>
      <p><strong>Tipo:</strong> ${reacao.tipo}</p>
      <p>${reacao.descricao}</p>
    `;

    tocarSomReacao(); // ← Aqui toca o som de fato
  } else {
    painelReacao.innerHTML = `
      <h2>❌ Reação Não Encontrada</h2>
      <p>A combinação escolhida não existe no banco de dados.</p>
    `;
  }
}

// Lista que vai guardar o histórico
let historicoReacoes = [];

// Carrega o histórico salvo no navegador
function carregarHistorico() {
  const salvo = localStorage.getItem("historicoReacoes");

  // Se existir algo salvo, transforma de texto para objeto. Senão, cria lista vazia.
  historicoReacoes = salvo ? JSON.parse(salvo) : [];

  mostrarHistorico();
}

// Adiciona uma nova reação ao histórico
function adicionarHistorico(elementos, reacao) {
  const item = {
    elementos: elementos.join(" + "),
    resultado: reacao ? reacao.produto : "Nenhuma reação encontrada",
    equacao: reacao ? reacao.equacao : "—",
    data: new Date().toLocaleString("pt-BR")
  };

  // Coloca o item no começo da lista
  historicoReacoes.unshift(item);

  // Salva no navegador
  localStorage.setItem("historicoReacoes", JSON.stringify(historicoReacoes));

  mostrarHistorico();
}

// Mostra a lista de reações no HTML
function mostrarHistorico() {
  if (!historicoLista) return;

  if (historicoReacoes.length === 0) {
    historicoLista.innerHTML = "<p>Nenhuma reação realizada ainda.</p>";
    return;
  }

  historicoLista.innerHTML = historicoReacoes
    .map(item => `
      <div class="item-historico">
        <p><strong>${item.elementos}</strong></p>
        <p>${item.resultado}</p>
        <p>${item.equacao}</p>
        <small>${item.data}</small>
      </div>
    `)
    .join("");
}

// Botão para limpar tudo
if (btnLimparHistorico) {
  btnLimparHistorico.addEventListener("click", () => {
    if (!confirm("Deseja realmente apagar todo o histórico?")) return;

    historicoReacoes = [];
    localStorage.removeItem("historicoReacoes");
    mostrarHistorico();
  });
}


/* ========================
 MODO NEON
======================== */
if (btnToggleNeon) {
  btnToggleNeon.addEventListener('click', () => {
    document.body.classList.toggle('neon');
  });
}

/* ========================
 INICIALIZAÇÃO
======================== */
document.addEventListener('DOMContentLoaded', () => {
  popularTabela();
  carregarHistorico();
});
