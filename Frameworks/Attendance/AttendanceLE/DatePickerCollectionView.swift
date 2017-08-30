//
//  DatePickerCollectionView.swift
//  AttendanceLE
//
//  Created by Ben Kraus on 8/4/17.
//  Copyright © 2017 Instructure. All rights reserved.
//

import UIKit

class DatePickerDateCell: UICollectionViewCell {
    let label = UILabel()
    let highlightView = UIView()
    
    var isToday = false
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        
        highlightView.backgroundColor = #colorLiteral(red: 0, green: 0.5568627451, blue: 0.8862745098, alpha: 1)
        highlightView.layer.cornerRadius = 4.0
        highlightView.clipsToBounds = true
        highlightView.translatesAutoresizingMaskIntoConstraints = false
        contentView.addSubview(highlightView)
        
        label.textColor = isToday ? #colorLiteral(red: 0, green: 0.5568627451, blue: 0.8862745098, alpha: 1) : #colorLiteral(red: 0.1764705882, green: 0.231372549, blue: 0.2705882353, alpha: 1)
        label.translatesAutoresizingMaskIntoConstraints = false
        contentView.addSubview(label)
        
        setIsHighlighted(false)
        
        NSLayoutConstraint.activate([
            highlightView.widthAnchor.constraint(equalTo: contentView.widthAnchor, multiplier: 0.7),
            highlightView.heightAnchor.constraint(equalTo: contentView.heightAnchor, multiplier: 0.7),
            highlightView.centerXAnchor.constraint(equalTo: contentView.centerXAnchor),
            highlightView.centerYAnchor.constraint(equalTo: contentView.centerYAnchor),
            label.centerXAnchor.constraint(equalTo: contentView.centerXAnchor),
            label.centerYAnchor.constraint(equalTo: contentView.centerYAnchor),
        ])
    }
    
    func setIsHighlighted(_ highlighted: Bool) {
        if highlighted {
            highlightView.isHidden = false
            label.textColor = .white
        } else {
            highlightView.isHidden = true
            label.textColor = isToday ? #colorLiteral(red: 0, green: 0.5568627451, blue: 0.8862745098, alpha: 1) : #colorLiteral(red: 0.1764705882, green: 0.231372549, blue: 0.2705882353, alpha: 1)
        }
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}

class DatePickerMonthHeaderView: UICollectionReusableView {
    let stack = UIStackView()
    let yearLabel = UILabel()
    let monthLabel = UILabel()
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        
        stack.axis = .vertical
        stack.alignment = .fill
        stack.spacing = 16
        stack.translatesAutoresizingMaskIntoConstraints = false
        
        addSubview(stack)
        stack.addArrangedSubview(yearLabel)
        stack.addArrangedSubview(monthLabel)
        
        yearLabel.font = UIFont.systemFont(ofSize: 34, weight: UIFontWeightBold)
        yearLabel.textColor = #colorLiteral(red: 0.1764705882, green: 0.231372549, blue: 0.2705882353, alpha: 1)
        yearLabel.translatesAutoresizingMaskIntoConstraints = false
        
        monthLabel.font = UIFont.systemFont(ofSize: 18, weight: UIFontWeightSemibold)
        monthLabel.textColor = #colorLiteral(red: 0.1764705882, green: 0.231372549, blue: 0.2705882353, alpha: 1)
        monthLabel.translatesAutoresizingMaskIntoConstraints = false
        
        NSLayoutConstraint.activate([
            stack.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 8),
            stack.trailingAnchor.constraint(equalTo: trailingAnchor, constant: 8),
            stack.topAnchor.constraint(equalTo: topAnchor, constant: 16),
            stack.bottomAnchor.constraint(equalTo: bottomAnchor, constant: -8),
        ])
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}
