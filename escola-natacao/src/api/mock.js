import {S} from './session'
import {p2, ld, add} from '../utils/date'
const T = new Date()
const at = (n, h) => `${ld(add(T, n))}T${p2(h)}:00`
/* ===== API simulada (substituível pela real) ===== */
const users = [
  {nome: 'Aluno Demo', email: 'aluno@escola.com', senha: '123456'},
  {
    nome: 'Administração',
    email: 'admin@escola-de-natacao.example',
    senha: 'EscoladeNatacao280',
    adm: 1,
  },
  {nome: 'Carla Nunes', email: 'carla@escola.com', senha: '123456'},
]
const D = {
  org: {...S.org},
  sv: [
    {
      id: 1,
      nome: 'Natação infantil',
      descricao: 'Adaptação ao meio líquido e primeiros nados, de 4 a 10 anos.',
      duracao: 45,
      preco: 80,
      ativo: true,
      recursos: [1, 2],
    },
    {
      id: 2,
      nome: 'Hidroginástica',
      descricao: 'Aula em grupo de baixo impacto, ótima para articulações.',
      duracao: 50,
      preco: 60,
      ativo: true,
      recursos: [2, 3],
    },
    {
      id: 3,
      nome: 'Natação adulto',
      descricao: 'Técnica dos quatro nados e condicionamento.',
      duracao: 60,
      preco: 95,
      ativo: true,
      recursos: [1, 3],
    },
  ],
  rc: [
    {
      id: 1,
      nome: 'Marina Costa',
      bio: 'Ex-atleta, 12 anos ensinando crianças a perder o medo da água.',
      capacidade: 4,
      ativo: true,
    },
    {
      id: 2,
      nome: 'Rafael Lima',
      bio: 'Especialista em hidroginástica e reabilitação.',
      capacidade: 12,
      ativo: true,
    },
    {
      id: 3,
      nome: 'Beatriz Souza',
      bio: 'Treinadora de nado crawl e águas abertas.',
      capacidade: 3,
      ativo: true,
    },
  ],
  ag: [
    {
      id: 1,
      s: 1,
      r: 1,
      aluno: 'Aluno Demo',
      inicio: at(1, 9),
      status: 'confirmado',
      obs: 'João, 6 anos: primeira aula, tem medo de água',
    },
    {id: 2, s: 3, r: 3, aluno: 'Aluno Demo', inicio: at(3, 16), status: 'solicitado'},
    {id: 3, s: 1, r: 2, aluno: 'Aluno Demo', inicio: at(-5, 10), status: 'concluido'},
    {id: 4, s: 2, r: 2, aluno: 'Carla Nunes', inicio: at(0, 18), status: 'solicitado'},
    {
      id: 5,
      s: 1,
      r: 1,
      aluno: 'Carla Nunes',
      inicio: at(-9, 9),
      status: 'concluido',
      nota: 5,
      coment: 'Minha filha adorou a Marina!',
    },
  ],
  dp: [],
}
let seq = 10
;[1, 2, 3].forEach(r => {
  for (let d = 0; d < 6; d++) {
    D.dp.push(
      {id: seq++, recurso: r, dia: d, inicio: '08:00', fim: '12:00'},
      {id: seq++, recurso: r, dia: d, inicio: '14:00', fim: '18:00'},
    )
  }
})
const R_ = (s, d) => ({status: s, data: d}),
  bad = d => {
    throw R_(400, d)
  }
export const mock = (m, p, b) =>
  new Promise(r =>
    setTimeout(() => {
      try {
        r(mk(m, p, b))
      } catch (x) {
        r(x.status ? x : R_(500, {}))
      }
    }, 220),
  )
function mk(m, p, b) {
  const [path, qs] = p.split('?'),
    q = Object.fromEntries(new URLSearchParams(qs || '')),
    seg = path.split('/').filter(Boolean),
    A = seg[0],
    id = +seg[1],
    act = seg[2]
  let bo =
    b instanceof FormData
      ? Object.fromEntries(
          [...b].map(([k, v]) => [k, v instanceof File ? URL.createObjectURL(v) : v]),
        )
      : {...(b || {})}
  if (b instanceof FormData) bo.recursos = b.getAll('recursos').map(Number)
  ;['capacidade', 'duracao', 'preco'].forEach(k => {
    if (k in bo && bo[k] !== '') bo[k] = +bo[k]
  })
  if ('ativo' in bo) bo.ativo = bo.ativo === true || bo.ativo == 'true'
  const u = users.find(x => S.tk && S.tk.access == 'a-' + x.email),
    perms = x =>
      x.adm
        ? [
            'api.confirmar_agendamento',
            'api.concluir_agendamento',
            'api.cancelar_agendamento',
            'api.change_organizacao',
          ]
        : ['api.add_agendamento', 'api.cancelar_agendamento', 'api.avaliar_agendamento']
  if (A == 'auth') {
    const s = seg[1]
    if (s == 'cadastro') {
      if (!bo.nome) bad({nome: ['Informe seu nome']})
      if (users.find(x => x.email == bo.email)) bad({email: ['Este e-mail já está cadastrado']})
      if ((bo.senha || '').length < 6) bad({senha: ['Senha fraca: use ao menos 6 caracteres']})
      users.push({nome: bo.nome, email: bo.email, senha: bo.senha})
      return R_(201, {})
    }
    if (s == 'login') {
      const x = users.find(x => x.email == bo.email && x.senha == bo.senha)
      if (!x) bad({detail: 'Organização, e-mail ou senha inválidos'})
      return R_(200, {access: 'a-' + x.email, refresh: 'r-' + x.email})
    }
    if (s == 'renovar') return R_(200, {access: 'a-' + bo.refresh.slice(2)})
    if (s == 'redefinir-senha') return R_(200, {})
    if (!u) return R_(401, {})
    if (s == 'alterar-senha') {
      if (u.senha != bo.senha_atual) bad({senha_atual: ['Senha atual incorreta']})
      if ((bo.nova_senha || '').length < 6)
        bad({nova_senha: ['Senha fraca: use ao menos 6 caracteres']})
      u.senha = bo.nova_senha
      return R_(200, {})
    }
    if (m == 'PATCH') {
      if (bo.nome) u.nome = bo.nome
      if ('foto' in bo) u.foto = bo.foto
    }
    return R_(200, {
      nome: u.nome,
      email: u.email,
      foto: u.foto || null,
      organizacao: D.org.nome,
      permissoes: perms(u),
    })
  }
  if (!u) return R_(401, {})
  if (A == 'organizacao') {
    if (m == 'PATCH') {
      if (!bo.nome) bad({nome: ['Obrigatório']})
      Object.assign(D.org, bo)
    }
    return R_(200, D.org)
  }
  const crud = (arr, mkn, val) => {
    if (m == 'GET') {
      if (id)
        return R_(
          200,
          arr.find(x => x.id == id),
        )
      let l = arr
      if (q.ativo) l = l.filter(x => String(x.ativo) == q.ativo)
      return R_(200, l)
    }
    val(bo)
    if (m == 'POST') {
      const o = {id: seq++, ativo: true, ...bo}
      arr.push(o)
      return R_(201, o)
    }
    return R_(
      200,
      Object.assign(
        arr.find(x => x.id == id),
        bo,
      ),
    )
  }
  if (A == 'servicos')
    return crud(D.sv, 0, o => {
      if (!o.nome && m == 'POST') bad({nome: ['Obrigatório']})
      if (o.duracao < 1) bad({duracao: ['Deve ser maior que zero']})
    })
  if (A == 'recursos') {
    if (m == 'GET' && !id && q.servicos) {
      const s = D.sv.find(x => x.id == q.servicos)
      return R_(
        200,
        D.rc.filter(r => r.ativo && s.recursos.includes(r.id)),
      )
    }
    return crud(D.rc, 0, o => {
      if (!o.nome && m == 'POST') bad({nome: ['Obrigatório']})
      if (o.capacidade < 1) bad({capacidade: ['Deve ser no mínimo 1']})
    })
  }
  if (A == 'disponibilidades') {
    if (m == 'GET')
      return R_(
        200,
        D.dp.filter(x => x.recurso == q.recurso),
      )
    if (m == 'DELETE') {
      D.dp = D.dp.filter(x => x.id != id)
      return R_(204, null)
    }
    const o = m == 'POST' ? bo : {...D.dp.find(x => x.id == id), ...bo}
    if (o.fim <= o.inicio) bad({fim: ['O fim deve ser depois do início']})
    if (m == 'POST') {
      bo.id = seq++
      D.dp.push(bo)
      return R_(201, bo)
    }
    return R_(
      200,
      Object.assign(
        D.dp.find(x => x.id == id),
        bo,
      ),
    )
  }
  if (A == 'horarios-livres') {
    const s = D.sv.find(x => x.id == q.servico),
      wd = (new Date(q.data + 'T12:00').getDay() + 6) % 7,
      out = []
    D.rc
      .filter(r => r.ativo && s.recursos.includes(r.id) && (!q.recurso || r.id == q.recurso))
      .forEach(r => {
        const ins = []
        for (let h = 7; h < 19; h++) {
          const t = `${q.data}T${p2(h)}:00`
          if (new Date(t) < new Date()) continue
          if (
            !D.dp.some(
              d =>
                d.recurso == r.id &&
                d.dia == wd &&
                d.inicio <= p2(h) + ':00' &&
                d.fim > p2(h) + ':00',
            )
          )
            continue
          if (
            D.ag.filter(a => a.r == r.id && a.inicio == t && a.status != 'cancelado').length >=
            r.capacidade
          )
            continue
          ins.push(t)
        }
        if (ins.length) out.push({recurso: {id: r.id, nome: r.nome}, inicios: ins})
      })
    return R_(200, out)
  }
  const ser = a => {
      const s = D.sv.find(x => x.id == a.s)
      return {
        id: a.id,
        servico: {id: s.id, nome: s.nome, duracao: s.duracao, preco: s.preco},
        recurso: {id: a.r, nome: D.rc.find(x => x.id == a.r).nome},
        aluno: a.aluno,
        inicio: a.inicio,
        status: a.status,
        observacoes: a.obs || '',
        avaliacao: a.nota ? {nota: a.nota, comentario: a.coment} : null,
      }
    },
    mine = x => u.adm || x.aluno == u.nome
  if (A == 'agendamentos') {
    if (act) {
      const a = D.ag.find(x => x.id == id),
        tr = {
          confirmar: ['solicitado', 'confirmado'],
          concluir: ['confirmado', 'concluido'],
          cancelar: ['solicitado,confirmado', 'cancelado'],
        }[act]
      if (act == 'avaliar') {
        if (a.status != 'concluido' || a.nota)
          bad({detail: 'Esta aula já foi avaliada ou não está concluída'})
        if (!(bo.nota >= 1 && bo.nota <= 5)) bad({nota: ['A nota deve ser de 1 a 5']})
        a.nota = bo.nota
        a.coment = bo.comentario
        return R_(200, ser(a))
      }
      if (!tr[0].split(',').includes(a.status))
        bad({detail: 'O status atual não permite esta ação'})
      a.status = tr[1]
      return R_(200, ser(a))
    }
    if (id) return R_(200, ser(D.ag.find(x => x.id == id)))
    if (m == 'POST') {
      const r = D.rc.find(x => x.id == bo.recurso)
      if (
        !bo.inicio ||
        D.ag.filter(a => a.r == r.id && a.inicio == bo.inicio && a.status != 'cancelado').length >=
          r.capacidade ||
        D.ag.some(a => a.aluno == u.nome && a.inicio == bo.inicio && a.status != 'cancelado')
      )
        bad({inicio: ['Este horário não está mais disponível. Escolha outro.']})
      const a = {
        id: seq++,
        s: bo.servico,
        r: r.id,
        aluno: u.nome,
        inicio: bo.inicio,
        status: 'solicitado',
        obs: bo.observacoes,
      }
      D.ag.push(a)
      return R_(201, ser(a))
    }
    let l = D.ag.filter(mine)
    if (q.status) l = l.filter(a => a.status == q.status)
    if (q.recurso) l = l.filter(a => a.r == q.recurso)
    if (q.data_inicio) l = l.filter(a => a.inicio.slice(0, 10) >= q.data_inicio)
    if (q.data_fim) l = l.filter(a => a.inicio.slice(0, 10) <= q.data_fim)
    l.sort((a, b) => (a.inicio < b.inicio ? -1 : 1))
    if (q.ordering == '-inicio') l.reverse()
    const pg = +q.page || 1
    return R_(200, {results: l.slice((pg - 1) * 5, pg * 5).map(ser), next: l.length > pg * 5})
  }
  if (A == 'avaliacoes') {
    let l = D.ag.filter(a => a.nota)
    if (q.recurso) l = l.filter(a => a.r == q.recurso)
    if (q.nota) l = l.filter(a => a.nota == q.nota)
    return R_(200, {
      results: l.map(a => ({
        id: a.id,
        nota: a.nota,
        comentario: a.coment,
        aluno: a.aluno,
        recurso: {id: a.r, nome: D.rc.find(x => x.id == a.r).nome},
        servico: D.sv.find(x => x.id == a.s).nome,
      })),
      next: false,
    })
  }
  return R_(404, {})
}
