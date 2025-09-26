#!/usr/bin/env zsh
# Skrypt: kopiuje wszystkie pliki "nazwa_zrodlowa.*" na "nowa_nazwa.*"

setopt NULL_GLOB   # brak dopasowania globu = brak błędu

if [ $# -lt 2 ]; then
  echo "❌ Użycie: ./copy_files.zsh nazwa_zrodlowa nowa_nazwa"
  exit 1
fi

src_base="$1"
new_base="$2"
copied=0

for file in "${src_base}".*; do
  if [ -e "$file" ]; then
    ext="${file##*.}"
    target="${new_base}.${ext}"
    cp -- "$file" "$target"
    echo "✅ $file → $target"
    copied=$((copied+1))
  fi
done

if [ $copied -eq 0 ]; then
  echo "⚠️ Nie znaleziono plików '${src_base}.*'"
fi
