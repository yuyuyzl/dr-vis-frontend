function t(zh,en){
    return ()=>({zh:zh||en,en:en||zh});
};

const translation={
    patient:{
        pdid: t("ID"),
        name:t("姓名","Name"),
        birthDate: t("出生日期","Birthdate"),
        age: t("年龄（入院时）","Age"),
        gender: t("性别","Gender"),
        death: t("已去世","Dead"),
        deathDate: t("去世日期","Date of death"),
        deathAge: t("去世时年龄", "Age of death"),
        deathReason: t("死因","Death reason"),
        height: t("身高（入院时）","Height"),
        weight: t("体重（入院时）","Weight"),
    }
};

console.log(translation);


function i18n(lang){
    return (function collect(translation){
        if(typeof translation==="function"){
            return translation.call(this)[lang]
        }
        else return Object.fromEntries(Object.entries(translation).map((a)=>[a[0],collect(a[1])]))
    })(translation);
}

export default i18n;

