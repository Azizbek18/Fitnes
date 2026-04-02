let supabaseKey = 'sb_publishable_9oYVfdjz9tqko55o9EZjdQ_AXWhvvhu'
let supaBaseUrl = 'https://olerglrehwbfolrsyzzo.supabase.co'

const _supabase = supabase.createClient(supaBaseUrl, supabaseKey)


async function Yuborish() {
    let ism = document.getElementById('email')
    let parol = document.getElementById('password')

    if (ism.value == "" && parol.value == "") {
        alert("Maydonlarni to'ldiring")
        return
    }

    const { data:foydalanuvchi, error: xatolik } = await _supabase
        .from('login')
        .select('*')
        .eq('email', ism.value)
        .eq('parol', parol.value)
    if (xatolik) {
        alert("Xatolik yuz berdi" + xatolik.message)
        return
    }
    if (foydalanuvchi.length > 0) {
        alert("Siz ro'yhatdan o'tgan  ekansiz. Kirish qismiga o'ting")
        window.location.href = "index.html"
    }
    else {
        const { error } = await _supabase
            .from('login')
            .insert([
                {
                    email : ism.value,
                    parol : parol.value,
                }
            ])
        if (error) {
            alert("Xatolik yuz berdi" + error.message)
        }
        else {
            alert("Siz ro'yhatdan o'tdingiz tabriklaymiz!!!")
            window.location.href = 'index.html'
        }
    }

}
