#!/usr/bin/env zsh
# Skrypt: zmienia wszystkie pliki "blank copy.*" na nową nazwę

setopt NULL_GLOB   # brak dopasowania globu = brak błędu

if [ -z "$1" ]; then
  echo "❌ Użycie: ./rename_from_blank.zsh nowa_nazwa"
  exit 1
fi

newname="$1"
renamed=0

for file in "blank copy".*; do
  if [ -e "$file" ]; then
    ext="${file##*.}"
    target="${newname}.${ext}"
    mv -- "$file" "$target"
    echo "✅ $file → $target"
    renamed=$((renamed+1))
  fi
done

if [ $renamed -eq 0 ]; then
  echo "⚠️ Nie znaleziono plików 'blank copy.*'"
fi

